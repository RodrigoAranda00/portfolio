"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ExperienceImage } from "@/lib/data/experience";

const AUTOPLAY_MS = 4500;

export function ExperienceGallery({ images }: { images: ExperienceImage[] }) {
  const t = useTranslations("experience");
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || paused || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion, paused, images.length]);

  const image = images[index];

  return (
    <div
      className="relative aspect-[4/1] overflow-hidden rounded-2xl bg-tone-b-surface/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {image.placeholder ? (
            <span className="font-display text-5xl font-bold text-fg/40">
              {image.initials}
            </span>
          ) : (
            <Image
              src={image.src}
              alt={image.alt ?? ""}
              fill
              unoptimized
              className={cn(
                "object-cover",
                image.objectPosition === "top" && "object-top",
                image.objectPosition === "bottom" && "object-bottom",
              )}
            />
          )}

          {image.label && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3">
              <p className="text-sm font-medium text-fg">{image.label}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-3 right-4 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t("galleryDotLabel", { index: i + 1 })}
              className={cn(
                "size-2 rounded-full transition-colors",
                i === index ? "bg-fg" : "bg-fg/30 hover:bg-fg/50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
