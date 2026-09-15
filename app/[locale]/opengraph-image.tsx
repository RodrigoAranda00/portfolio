import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { profile } from "@/lib/data/profile";
import { ogTheme } from "@/lib/theme";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: `linear-gradient(135deg, ${ogTheme.canvas} 60%, ${ogTheme.indigo})`,
          color: ogTheme.fg,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: ogTheme.maroonGlow, fontWeight: 600 }}>
          {profile.title}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 16 }}>
          {t("name")}
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 24,
            color: ogTheme.fgMuted,
            maxWidth: 900,
          }}
        >
          {t("tagline")}
        </div>
      </div>
    ),
    size,
  );
}
