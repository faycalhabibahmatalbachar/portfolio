"use client";
import { useRef, useState } from "react";
import { ui } from "../i18n";
import { useCVStore } from "../store";
import { cvFileName, downloadBlob, makeQR } from "../utils";
import { Seg } from "./fields";

export default function TopBar() {
  const store = useCVStore();
  const { data, design, sections, lang, setLang, loadPreset, resetAll, importAll } = store;
  const t = ui[lang];
  const [exporting, setExporting] = useState(null); // 'pdf' | 'docx' | null
  const fileRef = useRef();

  const exportPdf = async () => {
    setExporting("pdf");
    try {
      const [{ pdf }, { default: CVDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../pdf/CVDocument"),
      ]);
      const qr = design.showQR && design.qrUrl ? await makeQR(design.qrUrl) : null;
      const blob = await pdf(
        <CVDocument data={data} design={design} sections={sections} lang={lang} qr={qr} />
      ).toBlob();
      downloadBlob(blob, cvFileName(data.profile.fullName, "pdf"));
    } catch (e) {
      console.error(e);
    }
    setExporting(null);
  };

  const exportDocx = async () => {
    setExporting("docx");
    try {
      const { buildDocx } = await import("../docx/buildDocx");
      const blob = await buildDocx({ data, design, sections, lang });
      downloadBlob(blob, cvFileName(data.profile.fullName, "docx"));
    } catch (e) {
      console.error(e);
    }
    setExporting(null);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ data, design, sections }, null, 2)], { type: "application/json" });
    downloadBlob(blob, cvFileName(data.profile.fullName, "json"));
  };

  const importJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importAll(JSON.parse(reader.result));
      } catch {
        alert("Fichier JSON invalide / Invalid JSON file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const ghost =
    "px-3 py-2 rounded-lg text-xs font-medium border border-[#1a3a5c] text-gray-300 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <Seg
        value={lang}
        onChange={setLang}
        options={[
          { value: "fr", label: "FR" },
          { value: "en", label: "EN" },
        ]}
      />
      <button type="button" onClick={loadPreset} className={ghost}>
        ⤓ {t.loadPreset}
      </button>
      <button
        type="button"
        onClick={() => confirm(t.resetConfirm) && resetAll()}
        className="px-3 py-2 rounded-lg text-xs font-medium border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
      >
        {t.reset}
      </button>

      <div className="flex-1" />

      <button type="button" onClick={() => fileRef.current?.click()} className={ghost}>
        {t.importJson}
      </button>
      <input ref={fileRef} type="file" accept=".json,application/json" onChange={importJson} className="hidden" />
      <button type="button" onClick={exportJson} className={ghost}>
        {t.exportJson}
      </button>
      <button type="button" onClick={exportDocx} disabled={!!exporting} className={`${ghost} disabled:opacity-50`}>
        {exporting === "docx" ? "…" : t.downloadDocx}
      </button>
      <button
        type="button"
        onClick={exportPdf}
        disabled={!!exporting}
        className="px-5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-[#00d4ff] to-[#0099cc] text-[#050b18] hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all disabled:opacity-50"
      >
        {exporting === "pdf" ? t.generating : `⬇ ${t.downloadPdf}`}
      </button>
    </div>
  );
}
