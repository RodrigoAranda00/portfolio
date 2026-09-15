import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ChevronDown, Download, Mouse, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/motion/Reveal";
import { EmailCopyPill } from "@/components/sections/EmailCopyPill";
import { profile } from "@/lib/data/profile";
import { skills, skillCategories } from "@/lib/data/skills";
import { skillIcons } from "@/lib/skill-icons";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

function SkillPill({ skill }: { skill: string }) {
  const Icon = skillIcons[skill];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-tone-a-accent px-3 py-1.5 text-sm font-medium text-tone-a-accent">
      {Icon && <Icon className="size-4" />}
      {skill}
    </span>
  );
}

export async function Hero() {
  const t = await getTranslations("hero");
  const tContact = await getTranslations("contact");

  const [firstName, ...restName] = t("name").split(" ");
  const lastName = restName.join(" ");
  const heroSkills = skills.slice(0, 6);

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center sm:text-left">
      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:justify-center sm:gap-10">
          <Reveal delay={0.1} className="order-2 max-w-2xl sm:order-1">
            <p className="text-sm font-medium uppercase tracking-wide text-tone-a-accent">
              {t("title")}
            </p>
            <h1 className="mt-2 font-display text-6xl font-bold leading-none text-fg sm:text-7xl">
              <span className="block">{firstName}</span>
              <span className="block text-tone-a-accent">{lastName}</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-fg-muted sm:text-xl">
              {t("tagline")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <Button
                size="lg"
                className="h-12 gap-2 bg-tone-a-accent px-6 text-base text-fg hover:bg-tone-a-accent/80"
                nativeButton={false}
                render={<a href={profile.resumeHref} download />}
              >
                <Download className="size-4" />
                {t("ctaResume")}
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                className="size-12"
                aria-label={tContact("githubLabel")}
                nativeButton={false}
                render={
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <GithubIcon className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                className="size-12"
                aria-label={tContact("linkedinLabel")}
                nativeButton={false}
                render={
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <LinkedinIcon className="size-5" />
              </Button>
            </div>

            <div className="mt-6 flex justify-center sm:justify-start">
              <EmailCopyPill
                email={profile.email}
                sendLabel={tContact("sendEmail")}
                copyLabel={tContact("copyEmail")}
                copiedLabel={tContact("emailCopied")}
              />
            </div>
          </Reveal>

          <Reveal className="relative order-1 aspect-[5/8] w-40 sm:order-2 sm:h-full sm:w-48 lg:w-56 xl:w-64">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-full bg-tone-a-accent/35 blur-3xl sm:-inset-6"
            />
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border/60">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="w-full sm:text-center">
          <p className="text-s font-medium text-fg-muted">{t("skillsLabel")}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3 sm:flex-nowrap">
            {heroSkills.map((skill) => (
              <SkillPill key={skill} skill={skill} />
            ))}

            <Dialog>
              <DialogTrigger
                render={
                  <button
                    type="button"
                    className="cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-tone-a-accent px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-tone-a-accent/80"
                  />
                }
              >
                <Plus className="size-4" />
                {t("viewAllSkills")}
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t("allSkillsTitle")}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-5">
                  {skillCategories.map((category) => (
                    <div key={category.id}>
                      <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                        {t(`skillCategories.${category.id}`)}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3">
                        {category.skills.map((skill) => (
                          <SkillPill key={skill} skill={skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex animate-bounce flex-col items-center gap-0.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        <span className="mt-1 text-xs font-medium uppercase tracking-wide">
          {t("scrollHint")}
        </span>
        <Mouse className="size-6" />
        <ChevronDown className="-mt-1 size-4" />
      </div>
    </div>
  );
}
