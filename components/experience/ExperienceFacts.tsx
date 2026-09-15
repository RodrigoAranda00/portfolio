import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ExperienceBackButton } from "@/components/experience/ExperienceBackButton";
import { StackBadges } from "@/components/StackBadges";
import { formatMonth } from "@/lib/utils";
import type { ExperienceEntry } from "@/lib/data/experience";

export async function ExperienceFacts({ role }: { role: ExperienceEntry }) {
  const t = await getTranslations("experience");
  const locale = await getLocale();

  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
      <div className="flex items-center gap-3">
        <div className="relative flex size-14 shrink-0 items-center justify-center">
          {role.logo.placeholder ? (
            <span className="font-display text-base font-bold text-fg/70">
              {role.logo.initials}
            </span>
          ) : (
            <Image
              src={role.logo.src}
              alt={role.logo.alt ?? ""}
              fill
              unoptimized
              className="object-contain"
            />
          )}
        </div>
        <div>
          <p className="text-xl font-display font-semibold text-fg">
            {role.company}
          </p>
          {role.clientName && (
            <p className="text-sm text-fg-muted">
              {t("clientLabel")} {role.clientName}
            </p>
          )}
        </div>
      </div>

      <h1 className="text-fg-muted">
        {t("roleLabel")}{" "}
        <span className="font-medium text-fg">
          {t(`roles.${role.id}.title`)}
        </span>
      </h1>

      <p className="text-xs font-medium uppercase tracking-wide text-experience-accent">
        {formatMonth(role.startDate, locale)} —{" "}
        {role.endDate === "present"
          ? t("present")
          : formatMonth(role.endDate, locale)}
      </p>

      <div>
        <p className="text-sm font-medium text-fg-muted">{t("stackHeading")}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <StackBadges stack={role.stack} />
        </div>
      </div>

      <div className="hidden lg:mt-16 lg:flex lg:justify-center">
        <ExperienceBackButton />
      </div>
    </aside>
  );
}
