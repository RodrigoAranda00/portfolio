import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Compass } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { hobbies } from "@/lib/data/hobbies";

export async function BeyondWork() {
  const t = await getTranslations("beyondWork");

  return (
    <div>
      <SectionHeading icon={Compass}>{t("heading")}</SectionHeading>

      <div className="mt-12 flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-center sm:gap-12">
        <div className="order-2 max-w-xl space-y-4 text-center sm:order-2 sm:text-left">
          <p className="text-lg text-fg-muted sm:text-xl">{t("intro")}</p>
          <p className="text-lg text-fg-muted sm:text-xl">{t("hobbiesBlurb")}</p>
          <p className="text-lg text-fg-muted sm:text-xl">{t("learningBlurb")}</p>
        </div>

        <Reveal className="relative order-1 aspect-square w-[19.2rem] sm:order-1 sm:w-[21.6rem] lg:w-96">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-full bg-tone-a-accent/35 blur-3xl"
          />
          <div className="grid size-full grid-cols-2 grid-rows-2 gap-3">
            {hobbies.map((item, index) => (
              <div
                key={item.id}
                className={`relative overflow-hidden rounded-2xl border border-border/60 ${
                  index === 0 ? "row-span-2" : ""
                }`}
              >
                <Image
                  src={item.photo}
                  alt={t(`items.${item.id}`)}
                  fill
                  unoptimized
                  className="object-cover contrast-105"
                  style={{ objectPosition: item.focus ?? "50% 50%" }}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
