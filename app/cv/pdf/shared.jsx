import { cvLabels } from "../i18n";
import { resolveFont } from "./fonts";

// One theme object derived from the design config, consumed by every template.
export function makeTheme(design, lang) {
  const f = resolveFont(design.font);
  const density = design.density === "compact" ? 0.82 : design.density === "relaxed" ? 1.18 : 1;
  const size = design.sizeScale || 1;
  return {
    accent: design.accent || "#0891b2",
    font: f,
    // px(n): vertical rhythm, fs(n): font sizes — both scale with user prefs
    px: (n) => Math.round(n * density * 10) / 10,
    fs: (n) => Math.round(n * size * 10) / 10,
    labels: cvLabels[lang] || cvLabels.fr,
    text: "#1f2937",
    muted: "#6b7280",
    line: "#e5e7eb",
  };
}

export const splitLines = (text) =>
  (text || "")
    .split("\n")
    .map((l) => l.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);

export const splitTools = (tools) =>
  (tools || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

export function fmtRange(start, end, labels) {
  const e = /^(present|aujourd|now)/i.test((end || "").trim()) ? labels.present : end;
  if (start && e) return `${start} — ${e}`;
  return start || e || "";
}

// Sections that actually have content — empty sections never reach the PDF.
export function visibleSections(sections, data) {
  return sections
    .filter((s) => s.visible)
    .map((s) => s.key)
    .filter((key) => {
      if (key === "summary") return !!data.profile.summary?.trim();
      return Array.isArray(data[key]) && data[key].length > 0;
    });
}

export function contactItems(profile) {
  const strip = (url) => (url || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return [
    profile.email,
    profile.phone,
    profile.address,
    strip(profile.website),
    strip(profile.linkedin),
    strip(profile.github),
  ].filter(Boolean);
}
