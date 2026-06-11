import { Font } from "@react-pdf/renderer";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const font = (file) => `${BASE}/fonts/${file}`;

let registered = false;

export function registerFonts() {
  if (registered) return;
  registered = true;

  Font.register({
    family: "Inter",
    fonts: [
      { src: font("inter-400.woff"), fontWeight: 400 },
      { src: font("inter-600.woff"), fontWeight: 600 },
      { src: font("inter-700.woff"), fontWeight: 700 },
    ],
  });

  Font.register({
    family: "Lora",
    fonts: [
      { src: font("lora-400.woff"), fontWeight: 400 },
      { src: font("lora-600.woff"), fontWeight: 600 },
      { src: font("lora-700.woff"), fontWeight: 700 },
    ],
  });

  // Keep words intact — hyphenated French words look broken on a CV.
  Font.registerHyphenationCallback((word) => [word]);
}

// Map the design font choice to a registered (or built-in) family.
export function resolveFont(name) {
  switch (name) {
    case "Inter":
      return { family: "Inter", bold: 700, semi: 600 };
    case "Lora":
      return { family: "Lora", bold: 700, semi: 600 };
    case "Times":
      return { family: "Times-Roman", bold: "bold", semi: "bold", builtin: true };
    default:
      return { family: "Helvetica", bold: "bold", semi: "bold", builtin: true };
  }
}
