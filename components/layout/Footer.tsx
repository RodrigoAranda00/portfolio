import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { profile } from "@/lib/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export async function Footer() {
  const t = await getTranslations("footer");
  const tContact = await getTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-fg-muted">
          © {year} {profile.name}. {t("rights")}
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <p className="text-sm font-medium text-tone-a-accent">{t("cta")}</p>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              aria-label={tContact("emailLabel")}
              className="text-fg-muted transition-colors hover:text-fg"
            >
              <Mail className="size-5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tContact("githubLabel")}
              className="text-fg-muted transition-colors hover:text-fg"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tContact("linkedinLabel")}
              className="text-fg-muted transition-colors hover:text-fg"
            >
              <LinkedinIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
