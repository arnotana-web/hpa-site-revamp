import Anthropic from '@anthropic-ai/sdk';

// Flavour + dietary vocabulary the model must choose from. Kept in sync with
// FLAVOR_TOKENS / dietConflict in palate/index.html so client-side ranking works.
const FLAVORS = [
  'umami', 'savory', 'rich', 'roast', 'seafood', 'raw', 'clean', 'fresh',
  'herbal', 'spice', 'spicy', 'sweet', 'creamy', 'tangy', 'smoky', 'fermented',
  'light', 'refined', 'aromatic', 'complex', 'earthy', 'adventurous', 'veg',
];
const DIET = [
  'meat', 'pork', 'beef', 'poultry', 'lamb', 'seafood',
  'dairy', 'egg', 'gluten', 'alcohol',
];

const SYSTEM = `You analyse a photo of a restaurant menu in ANY language.

Steps:
1. Read all text in the image (OCR), whatever the language or script.
2. Extract every individual FOOD or DRINK dish. Ignore section headers
   (e.g. "Starters", "Primi", "Desserts"), prices, the restaurant name,
   addresses, phone numbers and decorative text.
3. For each dish produce:
   - original: the dish name exactly as printed, with the price removed.
   - translated: the dish name in the target language. If it is already in
     that language, copy it.
   - description: ONE short sentence in the target language describing the
     taste, key ingredients or preparation.
   - flavors: the applicable subset of this fixed list: ${FLAVORS.join(', ')}.
   - diet: every applicable token from this fixed list: ${DIET.join(', ')}.
     If the dish contains pork, beef, poultry or lamb, ALSO include "meat".
   - kcal: integer estimate of calories for one typical restaurant portion.
4. Also return "cuisine": the overall cuisine in one English word
   (e.g. Italian, Japanese, Indian, Lebanese, Mexican). Empty string if unsure.

Rules:
- Translate faithfully; do not invent dishes that are not on the menu.
- Include desserts and notable drinks, but not plain water.
- At most 30 dishes.
- If the image is not a readable menu, or you cannot extract at least two
  dishes, return {"cuisine":"","dishes":[]}.
Respond ONLY with JSON conforming to the schema.`;

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    cuisine: { type: 'string' },
    dishes: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          original: { type: 'string' },
          translated: { type: 'string' },
          description: { type: 'string' },
          flavors: { type: 'array', items: { type: 'string', enum: FLAVORS } },
          diet: { type: 'array', items: { type: 'string', enum: DIET } },
          kcal: { type: 'integer' },
        },
        required: ['original', 'translated', 'description', 'flavors', 'diet', 'kcal'],
      },
    },
  },
  required: ['cuisine', 'dishes'],
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!process.env.ANTHROPIC_API_KEY) {
    return json({ error: 'Server is not configured (missing API key).' }, 500);
  }

  let body;
  try {
    body = await req.json();
  } catch (_) {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const image = body && body.image;
  const lang = (body && typeof body.lang === 'string' && body.lang.slice(0, 12)) || 'en';
  if (typeof image !== 'string') return json({ error: 'Missing image' }, 400);

  const m = image.match(/^data:(image\/(?:jpeg|png|webp|gif));base64,(.+)$/);
  if (!m) return json({ error: 'Invalid image data URL' }, 400);
  const mediaType = m[1];
  const data = m[2];

  const client = new Anthropic();

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-7', // swappable: claude-sonnet-4-6 is cheaper/faster
      max_tokens: 8000,
      output_config: {
        effort: 'low', // scoped extraction task; raise for harder menus
        format: { type: 'json_schema', schema },
      },
      system: [
        { type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } },
      ],
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data } },
            { type: 'text', text: `Target language (BCP-47 code): ${lang}. Analyse this menu photo.` },
          ],
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === 'text');
    if (!textBlock) return json({ error: 'Empty model response' }, 502);

    let parsed;
    try {
      parsed = JSON.parse(textBlock.text);
    } catch (_) {
      return json({ error: 'Could not parse model output' }, 502);
    }
    return json(parsed, 200);
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      const status = err.status && err.status >= 400 ? err.status : 502;
      return json({ error: err.message || 'Upstream model error' }, status);
    }
    return json({ error: 'Analysis failed' }, 500);
  }
};
