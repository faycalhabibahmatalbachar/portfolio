import { Document } from "@react-pdf/renderer";
import { registerFonts } from "./fonts";
import { makeTheme } from "./shared";
import { absoluteSrc } from "../utils";
import ATS from "./templates/ATS";
import Executive from "./templates/Executive";
import Modern from "./templates/Modern";
import TwoColumn from "./templates/TwoColumn";

registerFonts();

const TEMPLATES = { modern: Modern, twocolumn: TwoColumn, executive: Executive, ats: ATS };

export default function CVDocument({ data, design, sections, lang, qr }) {
  const Template = TEMPLATES[design.template] || Modern;
  const theme = makeTheme(design, lang);
  const safeData = {
    ...data,
    profile: { ...data.profile, photo: absoluteSrc(data.profile.photo) },
  };
  return (
    <Document
      title={`CV — ${data.profile.fullName || ""}`}
      author={data.profile.fullName || ""}
      creator="CV Studio — faycalhabibahmat.is-a.dev"
      producer="CV Studio"
    >
      <Template data={safeData} theme={theme} sections={sections} design={design} qr={design.template === "ats" ? null : qr} />
    </Document>
  );
}
