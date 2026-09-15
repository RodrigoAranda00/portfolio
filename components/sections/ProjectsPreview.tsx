import { FolderGit2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/data/projects";

export async function ProjectsPreview() {
  const t = await getTranslations("projects");
  const featured = projects.filter((project) => project.featured);

  return (
    <div>
      <SectionHeading icon={FolderGit2}>{t("heading")}</SectionHeading>
      <div className="mt-12 flex flex-col gap-8">
        {featured.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
