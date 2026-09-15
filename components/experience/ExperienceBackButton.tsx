import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function ExperienceBackButton({
  className,
}: {
  className?: string;
}) {
  const t = await getTranslations("experience");

  return (
    <Button
      className={cn(
        "w-full justify-center gap-2 bg-tone-a-accent text-fg hover:bg-tone-a-accent/80 lg:h-11 lg:w-auto lg:px-8 lg:text-base",
        className,
      )}
      nativeButton={false}
      render={<Link href="/#experience" transitionTypes={["nav-back"]} />}
    >
      <ArrowLeft className="size-4" />
      {t("back")}
    </Button>
  );
}
