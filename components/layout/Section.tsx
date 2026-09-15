import { cn } from "@/lib/utils";

const toneStyles = {
  a: {
    surface: "bg-tone-a-surface/30",
    accent: "text-tone-a-accent",
  },
  b: {
    surface: "bg-tone-b-surface",
    accent: "text-tone-b-accent",
  },
} as const;

export type Tone = keyof typeof toneStyles;

export function Section({
  id,
  tone,
  className,
  wide,
  children,
}: {
  id?: string;
  tone: Tone;
  className?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        "relative scroll-mt-20 py-20 sm:py-28",
        toneStyles[tone].surface,
        className,
      )}
    >
      <div className={cn("mx-auto px-6", wide ? "max-w-7xl" : "max-w-5xl")}>
        {children}
      </div>
    </section>
  );
}

export function toneAccentClass(tone: Tone) {
  return toneStyles[tone].accent;
}
