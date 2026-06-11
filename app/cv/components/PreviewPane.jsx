"use client";
import { useEffect, useRef, useState } from "react";
import { ui } from "../i18n";
import { useCVStore } from "../store";
import { makeQR } from "../utils";

// Live preview: the actual PDF, regenerated (debounced) on every change.
// What you see is exactly what you download.
export default function PreviewPane() {
  const { data, design, sections, lang } = useCVStore();
  const [url, setUrl] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(false);
  const timer = useRef();
  const seq = useRef(0);
  const t = ui[lang];

  useEffect(() => {
    clearTimeout(timer.current);
    setBusy(true);
    timer.current = setTimeout(async () => {
      const mySeq = ++seq.current;
      try {
        const [{ pdf }, { default: CVDocument }] = await Promise.all([
          import("@react-pdf/renderer"),
          import("../pdf/CVDocument"),
        ]);
        const qr = design.showQR && design.qrUrl ? await makeQR(design.qrUrl) : null;
        const blob = await pdf(
          <CVDocument data={data} design={design} sections={sections} lang={lang} qr={qr} />
        ).toBlob();
        if (mySeq !== seq.current) return;
        const next = URL.createObjectURL(blob);
        setUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return next;
        });
        setError(false);
      } catch (e) {
        console.error("PDF preview failed:", e);
        if (mySeq === seq.current) setError(true);
      }
      if (mySeq === seq.current) setBusy(false);
    }, 450);
    return () => clearTimeout(timer.current);
  }, [data, design, sections, lang]);

  return (
    <div className="relative rounded-2xl border border-[#1a3a5c] bg-[#081222] overflow-hidden h-[78vh] min-h-[480px]">
      {url && !error ? (
        <iframe
          title="CV preview"
          src={`${url}#toolbar=0&navpanes=0&view=FitH`}
          className="w-full h-full"
          style={{ border: "none", background: "#3a4654" }}
        />
      ) : null}
      {!url && !error ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">{t.generating}</div>
      ) : null}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-red-400 text-sm px-6 text-center">
          PDF error — check the console / vérifiez la console.
        </div>
      ) : null}
      {busy && url ? (
        <div className="absolute top-3 right-3 flex items-center gap-2 rounded-full bg-[#050b18]/90 border border-[#1a3a5c] px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
          <span className="text-xs text-gray-400">{t.generating}</span>
        </div>
      ) : null}
    </div>
  );
}
