import { cvLabels } from "../i18n";
import { contactItems, fmtRange, splitLines, splitTools, visibleSections } from "../pdf/shared";

// One clean, recruiter-editable Word layout (independent of the PDF template).
export async function buildDocx({ data, design, sections, lang }) {
  const { AlignmentType, BorderStyle, Document, Packer, Paragraph, TextRun } = await import("docx");

  const labels = cvLabels[lang] || cvLabels.fr;
  const accent = (design.accent || "#0891b2").replace("#", "");
  const { profile } = data;

  const heading = (text) =>
    new Paragraph({
      spacing: { before: 280, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: accent } },
      children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: "1f2937" })],
    });

  const body = (text, opts = {}) =>
    new Paragraph({
      spacing: { after: opts.after ?? 80 },
      bullet: opts.bullet ? { level: 0 } : undefined,
      children: [
        new TextRun({ text, size: 19, color: opts.color || "1f2937", bold: opts.bold, italics: opts.italics }),
      ],
    });

  const entryHeader = (left, right) =>
    new Paragraph({
      spacing: { before: 120, after: 40 },
      tabStops: [{ type: "right", position: 9600 }],
      children: [
        new TextRun({ text: left, bold: true, size: 21, color: "1f2937" }),
        new TextRun({ text: `\t${right}`, size: 18, color: "6b7280" }),
      ],
    });

  const children = [
    new Paragraph({
      children: [new TextRun({ text: profile.fullName, bold: true, size: 44, color: "111827" })],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: profile.title, size: 23, color: accent, bold: true })],
    }),
    new Paragraph({
      spacing: { after: 160 },
      children: [new TextRun({ text: contactItems(profile).join("   |   "), size: 17, color: "6b7280" })],
    }),
  ];

  const blocks = {
    summary: () => {
      children.push(heading(labels.summary));
      children.push(body(profile.summary, { after: 120 }));
    },
    experience: () => {
      children.push(heading(labels.experience));
      data.experience.forEach((exp) => {
        children.push(entryHeader(`${exp.role} — ${exp.company}`, fmtRange(exp.start, exp.end, labels)));
        if (exp.location) children.push(body(exp.location, { color: "6b7280", italics: true, after: 40 }));
        if (exp.description) children.push(body(exp.description));
        splitLines(exp.achievements).forEach((a) => children.push(body(a, { bullet: true, after: 40 })));
      });
    },
    education: () => {
      children.push(heading(labels.education));
      data.education.forEach((edu) => {
        children.push(entryHeader(edu.degree, fmtRange(edu.start, edu.end, labels)));
        children.push(body(edu.school, { color: "6b7280", after: 60 }));
        if (edu.description) children.push(body(edu.description));
      });
    },
    skills: () => {
      children.push(heading(labels.skills));
      children.push(body(data.skills.map((sk) => sk.name).join(", "), { after: 120 }));
    },
    projects: () => {
      children.push(heading(labels.projects));
      data.projects.forEach((p) => {
        const tools = splitTools(p.tools);
        children.push(entryHeader(p.name, tools.join(" · ")));
        if (p.description) children.push(body(p.description, { after: 40 }));
        if (p.link) children.push(body(p.link, { color: "6b7280", after: 60 }));
      });
    },
    languages: () => {
      children.push(heading(labels.languages));
      children.push(
        body(data.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(", "), { after: 120 })
      );
    },
    certifications: () => {
      children.push(heading(labels.certifications));
      data.certifications.forEach((c) =>
        children.push(body([c.name, c.issuer, c.year].filter(Boolean).join(" — "), { after: 60 }))
      );
    },
  };

  visibleSections(sections, data).forEach((key) => blocks[key]?.());

  const doc = new Document({
    styles: { default: { document: { run: { font: "Calibri" } } } },
    sections: [
      {
        properties: {
          page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}
