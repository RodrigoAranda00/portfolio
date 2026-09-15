import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { StackBadges } from "@/components/StackBadges";
import type { Project } from "@/lib/data/projects";

const GLASS_BACKDROP_SRC = "/projects/trolley_cover.png";

export async function ProjectCard({ project }: { project: Project }) {
  const t = await getTranslations("projects");

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/30 sm:flex-row sm:min-h-[26rem]">
      <Image
        src={GLASS_BACKDROP_SRC}
        alt=""
        aria-hidden="true"
        fill
        unoptimized
        className="scale-125 object-cover"
      />
      {project.coverImage.placeholder ? (
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-tone-a-surface/40 sm:aspect-auto sm:w-3/5 sm:shrink-0">
          <span className="font-display text-4xl font-bold text-fg/40 sm:text-5xl">
            {project.coverImage.initials}
          </span>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </div>
      ) : (
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden sm:aspect-auto sm:w-3/5 sm:shrink-0">
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt ?? ""}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </div>
      )}
      <div className="relative flex flex-1 flex-col gap-3 bg-canvas/90 p-6 backdrop-blur-xl sm:p-8">
        <h3 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
          {t(`items.${project.slug}.title`)}
        </h3>
        <p className="mb-2 text-base text-fg-muted">
          {t(`items.${project.slug}.summary`)}
        </p>
        <div className="flex flex-wrap gap-2">
          <StackBadges stack={project.stack} />
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-3">
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full border border-fg/50 px-4 py-2 text-sm font-semibold text-fg shadow-[0_0_20px_-4px] shadow-fg/40 transition-colors hover:border-fg hover:bg-fg/10"
            >
              <GithubIcon aria-hidden="true" className="size-5" />
              {t("repo")}
            </a>
          )}
          {project.hasLiveDemo && project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
              className="relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full border border-fg/50 px-4 py-2 text-sm font-semibold text-fg shadow-[0_0_20px_-4px] shadow-fg/40 transition-colors hover:border-fg hover:bg-fg/10"
            >
              <ExternalLink aria-hidden="true" className="size-5" />
              {t("liveDemo")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
