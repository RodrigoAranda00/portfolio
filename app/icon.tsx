import { ImageResponse } from "next/og";
import { ogTheme } from "@/lib/theme";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${ogTheme.indigo}, ${ogTheme.maroon})`,
          color: ogTheme.fg,
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 6,
        }}
      >
        RA
      </div>
    ),
    size,
  );
}
