"use client";
import { cvLabels, ui } from "../../i18n";
import { useCVStore } from "../../store";
import { SmallBtn } from "../fields";

export default function SectionsPanel() {
  const { sections, lang, toggleSection, moveSection } = useCVStore();
  const t = ui[lang];
  const labels = cvLabels[lang];

  return (
    <div>
      <p className="text-xs text-gray-500 mb-3">{t.sectionsHint}</p>
      {sections.map((sec, i) => (
        <div
          key={sec.key}
          className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 mb-2 transition-colors ${
            sec.visible ? "border-[#1a3a5c] bg-[#081222]" : "border-[#1a3a5c]/40 bg-transparent opacity-50"
          }`}
        >
          <button
            type="button"
            onClick={() => toggleSection(sec.key)}
            className="flex items-center gap-2.5 text-sm text-white"
          >
            <span
              className={`inline-flex w-4 h-4 rounded border items-center justify-center text-[10px] ${
                sec.visible ? "bg-[#00d4ff] border-[#00d4ff] text-[#050b18]" : "border-gray-500"
              }`}
            >
              {sec.visible ? "✓" : ""}
            </span>
            {labels[sec.key]}
          </button>
          <div className="flex items-center gap-1">
            <SmallBtn onClick={() => moveSection(sec.key, -1)} disabled={i === 0} title="↑">↑</SmallBtn>
            <SmallBtn onClick={() => moveSection(sec.key, 1)} disabled={i === sections.length - 1} title="↓">↓</SmallBtn>
          </div>
        </div>
      ))}
    </div>
  );
}
