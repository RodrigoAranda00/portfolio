import { notFound } from "next/navigation";
import { Award } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExperienceGallery } from "@/components/experience/ExperienceGallery";
import { ExperienceFacts } from "@/components/experience/ExperienceFacts";
import { ExperienceBackButton } from "@/components/experience/ExperienceBackButton";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { experience, getExperienceBySlug } from "@/lib/data/experience";

export function generateStaticParams() {
  return experience.map((role) => ({ slug: role.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experience/[slug]">) {
  const { locale, slug } = await params;
  const role = getExperienceBySlug(slug);
  if (!role) return {};

  const t = await getTranslations({ locale, namespace: "experience" });
  return {
    title: t(`roles.${role.id}.title`),
    description: t(`roles.${role.id}.description`),
  };
}

export default async function ExperiencePage({
  params,
}: PageProps<"/[locale]/experience/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const role = getExperienceBySlug(slug);
  if (!role) {
    notFound();
  }

  const t = await getTranslations("experience");

  return (
    <RouteTransition>
      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <ExperienceGallery images={role.images} />

        <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
          <ExperienceFacts role={role} />

          <div className="space-y-8">
            {t.has(`roles.${role.id}.product`) && (
              <section>
                <h2 className="font-display text-xl font-semibold text-fg">
                  {t("productHeading")}
                </h2>
                <p className="mt-2 text-fg-muted">
                  {t(`roles.${role.id}.product`)}
                </p>
              </section>
            )}
            <section>
              <h2 className="font-display text-xl font-semibold text-fg">
                {t("responsibilitiesHeading")}
              </h2>
              <p className="mt-2 text-fg-muted">
                {t(`roles.${role.id}.responsibilities`)}
              </p>
            </section>
            <section className="relative overflow-hidden rounded-2xl border border-experience-accent/40 bg-experience-accent/10 p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-experience-accent-glow/30 blur-2xl"
              />
              <div className="relative flex items-center gap-2 text-experience-accent">
                <Award className="size-5" />
                <h2 className="font-display text-xl font-semibold">
                  {t("achievementHeading")}
                </h2>
              </div>
              <p className="relative mt-3 text-fg">
                {t(`roles.${role.id}.achievement`)}
              </p>
            </section>

            <div className="lg:hidden">
              <ExperienceBackButton />
            </div>
          </div>
        </div>
      </main>
    </RouteTransition>
  );
}
