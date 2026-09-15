import { getTranslations, getLocale } from "next-intl/server";
import { Briefcase, Send, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ExperienceCardMedia } from "@/components/experience/ExperienceCardMedia";
import { experience } from "@/lib/data/experience";
import { profile } from "@/lib/data/profile";
import { cn, formatMonth } from "@/lib/utils";

const COLUMN_REM = 25;

const DOT_ROW_TOP = 82;

function TimelineBridges({ count }: { count: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 hidden sm:block"
      style={{ top: DOT_ROW_TOP }}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(
            "absolute h-0 border-t-2",
            i === count - 1 ? "border-dashed border-white/80" : "border-white",
          )}
          style={{
            left: `${i * COLUMN_REM + COLUMN_REM / 2}rem`,
            width: `${COLUMN_REM}rem`,
          }}
        />
      ))}
    </div>
  );
}

function TimelineDot({ future = false }: { future?: boolean }) {
  return (
    <span
      className={cn(
        "relative z-10 size-3 shrink-0 rounded-full bg-white",
        !future && "shadow-[0_0_8px_2px_rgba(245,244,247,0.5)]",
      )}
    />
  );
}

export async function Experience() {
  const t = await getTranslations("experience");
  const tContact = await getTranslations("contact");
  const locale = await getLocale();

  return (
    <div>
      <SectionHeading icon={Briefcase}>{t("heading")}</SectionHeading>

      <div className="mt-12 overflow-x-auto overflow-y-hidden py-10 scrollbar-hide">
        <div className="relative flex flex-col items-center gap-10 sm:mx-auto sm:w-fit sm:flex-row sm:items-start sm:gap-0">
          <TimelineBridges count={experience.length} />

          {experience.map((role, index) => (
            <Reveal
              key={role.id}
              delay={index * 0.1}
              className="flex w-full shrink-0 flex-col items-center sm:w-[25rem]"
            >
              <div className="mb-3 flex h-16 flex-col items-center justify-center text-center">
                <p className="font-display text-xl font-semibold text-fg">
                  {role.company}
                  {role.clientName && (
                    <span className="ml-1.5 text-sm font-normal text-fg-muted">
                      · {t("clientLabel")} {role.clientName}
                    </span>
                  )}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wide text-experience-accent">
                  <Briefcase className="size-4" />
                  {formatMonth(role.startDate, locale)} —{" "}
                  {role.endDate === "present"
                    ? t("present")
                    : formatMonth(role.endDate, locale)}
                </p>
              </div>

              <div className="flex w-full items-center justify-center">
                <TimelineDot />
              </div>
              <div className="h-10 w-0 border-l-2 border-dashed border-white/80" />

              <div className="group relative w-full px-6 sm:px-5">
                <span
                  aria-hidden="true"
                  className="absolute -inset-6 -z-10 opacity-60 blur-sm transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    background:
                      "radial-gradient(circle, var(--color-experience-accent-glow) 0%, transparent 65%)",
                  }}
                />
                <div className="relative block rounded-xl border border-white/10 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/40">
                  <ExperienceCardMedia
                    logo={role.logo}
                    title={t(`roles.${role.id}.title`)}
                    highlight={t(`roles.${role.id}.highlight`)}
                    stack={role.stack}
                    detailsHref={`/experience/${role.id}`}
                    detailsLabel={t("viewDetails")}
                  />
                  <Link
                    href={`/experience/${role.id}`}
                    transitionTypes={["nav-forward"]}
                    aria-hidden="true"
                    tabIndex={-1}
                    className="absolute inset-0"
                  />
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal
            delay={experience.length * 0.1}
            className="flex w-full shrink-0 flex-col items-center sm:w-[25rem]"
          >
            <div className="mb-3 flex h-16 flex-col items-center justify-center text-center">
              <p className="font-display text-xl font-semibold text-fg">
                {t("whatsNext")}
              </p>
            </div>

            <div className="flex w-full items-center justify-center">
              <TimelineDot future />
            </div>
            <div className="h-10 w-0 border-l-2 border-dashed border-white/80" />

            <div className="w-full px-6 sm:px-8">
              <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-white/80 p-8 text-center transition-colors duration-300 hover:border-white hover:bg-tone-b-surface/20">
                <Sparkles className="size-10 text-experience-accent/80" />

                <div className="w-full">
                  <p className="font-display text-lg font-semibold text-fg sm:whitespace-nowrap">
                    {t("futureLabel")}
                  </p>
                  <p className="mt-2 text-sm text-fg-muted">{t("futureBlurb")}</p>
                </div>

                <div className="group relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-experience-accent-glow opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40"
                  />
                  <Button
                    size="lg"
                    className="h-11 gap-2 bg-experience-accent px-6 text-base text-fg hover:bg-experience-accent/80"
                    nativeButton={false}
                    render={
                      <a
                        href={`mailto:${profile.email}`}
                        aria-label={tContact("emailLabel")}
                      />
                    }
                  >
                    <Send className="size-4" />
                    {t("contactCta")}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
