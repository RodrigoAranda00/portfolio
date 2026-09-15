import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { StackBadges } from "@/components/StackBadges";
import type { ExperienceImage } from "@/lib/data/experience";

export function ExperienceCardMedia({
  logo,
  title,
  highlight,
  stack,
  detailsHref,
  detailsLabel,
}: {
  logo: ExperienceImage;
  title: string;
  highlight: string;
  stack: string[];
  detailsHref: string;
  detailsLabel: string;
}) {
  return (
    <div className="relative flex w-full flex-col gap-3 overflow-hidden rounded-xl bg-experience-surface px-4 py-5">
      <div className="pointer-events-none relative z-10 flex items-center justify-between gap-2">
        <h3 className="line-clamp-2 min-w-0 flex-1 font-display text-lg font-semibold text-fg">
          {title}
        </h3>
        <div className="relative flex size-15 shrink-0 items-center justify-center">
          {logo.placeholder ? (
            <span className="font-display text-base font-bold text-fg/70">
              {logo.initials}
            </span>
          ) : (
            <Image
              src={logo.src}
              alt={logo.alt ?? ""}
              fill
              unoptimized
              className="object-contain"
            />
          )}
        </div>
      </div>

      <p className="pointer-events-none relative z-10 line-clamp-2 min-h-10 text-sm text-fg-muted">
        {highlight}
      </p>

      <div className="pointer-events-none relative z-10 mt-auto flex min-h-14 flex-wrap items-start gap-1.5 pt-1">
        <StackBadges stack={stack} />
      </div>

      <Link
        href={detailsHref}
        transitionTypes={["nav-forward"]}
        className="relative z-10 mt-1 inline-flex w-fit items-center gap-1.5 text-base font-semibold text-tone-a-accent transition-colors group-hover:text-fg"
      >
        {detailsLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
