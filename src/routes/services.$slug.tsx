import { createFileRoute, notFound } from "@tanstack/react-router";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services, type ServiceSlug } from "@/data/services";

const validSlugs: ServiceSlug[] = [
  "ffe",
  "fabrication",
  "conseil",
  "gestion-projet",
  "livraison",
  "distribution",
];

function isValidSlug(s: string): s is ServiceSlug {
  return (validSlugs as string[]).includes(s);
}

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (!isValidSlug(params.slug)) {
      throw notFound();
    }
    return { service: services[params.slug] };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service — HPA Concept" }] };
    const title = `${s.title} — HPA Concept`;
    const desc = s.intro;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: s.image },
        { name: "twitter:image", content: s.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="font-heading text-4xl text-primary mb-3">Service introuvable</h1>
        <p className="text-muted-foreground mb-6">Ce service n'existe pas ou a été déplacé.</p>
        <a href="/" className="text-primary underline">Retour à l'accueil</a>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="font-heading text-3xl text-primary mb-3">Une erreur est survenue</h1>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  return <ServiceDetailPage service={service} />;
}
