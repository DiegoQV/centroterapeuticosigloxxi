import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Centro Terapéutico Siglo XXI",
    short_name: "Siglo XXI",
    description:
      "Plataforma clínica y seguimiento terapéutico en Chachapoyas",
    start_url: "/pauta",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#059669",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
