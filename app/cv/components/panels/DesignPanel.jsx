"use client";
import { ui } from "../../i18n";
import { useCVStore } from "../../store";
import { Field, Input, PanelTitle, Seg, Toggle } from "../fields";

const ACCENTS = ["#0891b2", "#2563eb", "#4f46e5", "#059669", "#e11d48", "#ea580c", "#7c3aed", "#334155"];

const TEMPLATES = [
  { id: "modern", name: "Modern", desc: { fr: "Épuré, tech & startup", en: "Clean, tech & startup" } },
  { id: "twocolumn", name: "Two-Column", desc: { fr: "Sidebar sombre + photo", en: "Dark sidebar + photo" } },
  { id: "executive", name: "Executive", desc: { fr: "Serif élégant, profil dirigeant", en: "Elegant serif, executive" } },
  { id: "ats", name: "ATS", desc: { fr: "Optimisé robots de recrutement", en: "Applicant-tracking optimized" } },
];

// Tiny abstract preview of each template, pure CSS.
function Mini({ id, accent }) {
  const line = (w, c = "#cbd5e1") => <div style={{ height: 3, width: w, background: c, borderRadius: 2, marginBottom: 3 }} />;
  if (id === "twocolumn")
    return (
      <div className="flex gap-1 w-full h-full p-2 bg-white rounded">
        <div className="w-1/3 rounded-sm p-1" style={{ background: "#1e293b" }}>
          <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ background: accent }} />
          {line("100%", "#475569")}
          {line("70%", "#475569")}
        </div>
        <div className="flex-1 p-1">
          {line("80%", "#334155")}
          {line("50%", accent)}
          {line("100%")}
          {line("90%")}
        </div>
      </div>
    );
  if (id === "executive")
    return (
      <div className="w-full h-full p-2 bg-white rounded flex flex-col items-center pt-3">
        {line("60%", "#334155")}
        {line("35%", accent)}
        <div className="w-full border-t border-gray-200 my-1" />
        {line("80%")}
        {line("70%")}
      </div>
    );
  if (id === "ats")
    return (
      <div className="w-full h-full p-2 bg-white rounded">
        {line("55%", "#111")}
        {line("70%", "#666")}
        <div className="w-full border-t border-black my-1" />
        {line("100%")}
        {line("85%")}
        {line("90%")}
      </div>
    );
  return (
    <div className="w-full h-full p-2 bg-white rounded">
      {line("65%", "#334155")}
      {line("40%", accent)}
      <div style={{ height: 2, background: accent, marginBottom: 4 }} />
      {line("100%")}
      {line("85%")}
      {line("90%")}
    </div>
  );
}

export default function DesignPanel() {
  const { design, lang, setDesign } = useCVStore();
  const t = ui[lang];

  return (
    <div>
      <PanelTitle>{t.template}</PanelTitle>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => setDesign("template", tpl.id)}
            className={`rounded-xl border p-2 text-left transition-colors ${
              design.template === tpl.id ? "border-[#00d4ff] bg-[#00d4ff]/5" : "border-[#1a3a5c] hover:border-[#00d4ff]/50"
            }`}
          >
            <div className="h-24 mb-2 overflow-hidden rounded-lg">
              <Mini id={tpl.id} accent={design.accent} />
            </div>
            <p className="text-xs font-bold text-white">{tpl.name}</p>
            <p className="text-[11px] text-gray-500">{tpl.desc[lang]}</p>
          </button>
        ))}
      </div>
      {design.template === "ats" ? <p className="text-[11px] text-amber-400/90 mb-4 -mt-2">{t.atsNote}</p> : null}

      <PanelTitle>{t.accentColor}</PanelTitle>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {ACCENTS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setDesign("accent", c)}
            className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
              design.accent === c ? "border-white" : "border-transparent"
            }`}
            style={{ background: c }}
            aria-label={c}
          />
        ))}
        <input
          type="color"
          value={design.accent}
          onChange={(e) => setDesign("accent", e.target.value)}
          className="w-7 h-7 rounded-full border border-[#1a3a5c] bg-transparent cursor-pointer"
          title={t.accentColor}
        />
      </div>

      <PanelTitle>{t.font}</PanelTitle>
      <div className="mb-4">
        <Seg
          value={design.font}
          onChange={(v) => setDesign("font", v)}
          options={[
            { value: "Inter", label: "Inter" },
            { value: "Lora", label: "Lora" },
            { value: "Helvetica", label: "Helvetica" },
            { value: "Times", label: "Times" },
          ]}
        />
      </div>

      <PanelTitle>{t.fontSize}</PanelTitle>
      <div className="mb-4">
        <Seg
          value={String(design.sizeScale)}
          onChange={(v) => setDesign("sizeScale", Number(v))}
          options={[
            { value: "0.92", label: t.small },
            { value: "1", label: t.medium },
            { value: "1.08", label: t.large },
          ]}
        />
      </div>

      <PanelTitle>{t.density}</PanelTitle>
      <div className="mb-4">
        <Seg
          value={design.density}
          onChange={(v) => setDesign("density", v)}
          options={[
            { value: "compact", label: t.compact },
            { value: "normal", label: t.normal },
            { value: "relaxed", label: t.relaxed },
          ]}
        />
      </div>

      <PanelTitle>{t.paper}</PanelTitle>
      <div className="mb-4">
        <Seg
          value={design.paper}
          onChange={(v) => setDesign("paper", v)}
          options={[
            { value: "A4", label: "A4" },
            { value: "LETTER", label: "US Letter" },
          ]}
        />
      </div>

      <div className="border-t border-[#1a3a5c]/60 pt-2">
        <Toggle checked={design.showPhoto} onChange={(v) => setDesign("showPhoto", v)} label={t.showPhoto} />
        <Toggle checked={design.showQR} onChange={(v) => setDesign("showQR", v)} label={t.showQR} />
        {design.showQR ? (
          <Field label={t.qrUrl}>
            <Input value={design.qrUrl} onChange={(e) => setDesign("qrUrl", e.target.value)} />
          </Field>
        ) : null}
      </div>
    </div>
  );
}
