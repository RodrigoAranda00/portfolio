import { Award, Clock, GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { education, type EducationEntry } from "@/lib/data/education";

const KIND_ICONS: Record<EducationEntry["kind"], typeof GraduationCap> = {
  degree: GraduationCap,
  certificate: Award,
  "in-progress": Clock,
};

export async function EducationCerts() {
  const t = await getTranslations("education");

  return (
    <div>
      <SectionHeading icon={GraduationCap}>{t("heading")}</SectionHeading>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {education.map((entry, index) => {
          const Icon = KIND_ICONS[entry.kind];
          const isLastOdd =
            education.length % 2 !== 0 && index === education.length - 1;
          return (
            <Reveal
              key={entry.id}
              delay={index * 0.08}
              className={
                isLastOdd
                  ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-1rem)]"
                  : undefined
              }
            >
              <div className="group relative">
                <span
                  aria-hidden="true"
                  className="absolute -inset-3 -z-10 rounded-xl opacity-60 blur-sm transition-opacity duration-300 group-hover:opacity-90"
                />
                <div className="relative rounded-xl border border-white/10 bg-experience-surface p-5 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/40">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                      <Icon className="size-5" />
                    </span>
                    {entry.kind === "in-progress" ? (
                      <Badge
                        variant="outline"
                        className="gap-1.5 border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white"
                      >
                        <span className="size-1.5 animate-pulse rounded-full bg-white" />
                        {t("inProgress")}
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white"
                      >
                        {t.has(`entries.${entry.id}.year`)
                          ? t(`entries.${entry.id}.year`)
                          : entry.year}
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-fg">
                    {t(`entries.${entry.id}.title`)}
                  </h3>
                  <p className="text-sm text-fg-muted">{entry.institution}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
