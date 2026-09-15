import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { EducationCerts } from "@/components/sections/EducationCerts";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { BeyondWork } from "@/components/sections/BeyondWork";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <RouteTransition>
      <main className="flex flex-col">
        <Section id="hero" tone="a" className="py-0 sm:py-0" wide>
          <Hero />
        </Section>
        <Section id="experience" tone="b" wide>
          <Experience />
        </Section>
        <Section id="projects" tone="a">
          <ProjectsPreview />
        </Section>
        <Section id="education" tone="b">
          <EducationCerts />
        </Section>
        <Section id="beyond-work" tone="a">
          <BeyondWork />
        </Section>
      </main>
    </RouteTransition>
  );
}
