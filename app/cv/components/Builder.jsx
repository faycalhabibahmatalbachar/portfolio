"use client";
import { useState } from "react";
import { ui } from "../i18n";
import { useCVStore } from "../store";
import ContentPanel from "./panels/ContentPanel";
import DesignPanel from "./panels/DesignPanel";
import SectionsPanel from "./panels/SectionsPanel";
import PreviewPane from "./PreviewPane";
import TopBar from "./TopBar";

export default function Builder() {
  const lang = useCVStore((s) => s.lang);
  const t = ui[lang];
  const [tab, setTab] = useState("content");

  const tabs = [
    { id: "content", label: t.tabContent },
    { id: "design", label: t.tabDesign },
    { id: "sections", label: t.tabSections },
  ];

  return (
    <div className="py-6 lg:py-10">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
          {t.title}
          <span className="text-[#00d4ff]">.</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">{t.subtitle}</p>
      </div>

      <TopBar />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(360px,440px)_1fr] gap-6 items-start">
        {/* Left: editor */}
        <aside className="rounded-2xl border border-[#1a3a5c] bg-[#050b18]/60">
          <div className="flex border-b border-[#1a3a5c]">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                type="button"
                onClick={() => setTab(tb.id)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  tab === tb.id
                    ? "text-[#00d4ff] border-b-2 border-[#00d4ff] bg-[#00d4ff]/5"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tb.label}
              </button>
            ))}
          </div>
          <div className="p-4 max-h-[78vh] overflow-y-auto">
            {tab === "content" ? <ContentPanel /> : null}
            {tab === "design" ? <DesignPanel /> : null}
            {tab === "sections" ? <SectionsPanel /> : null}
          </div>
        </aside>

        {/* Right: live PDF preview */}
        <PreviewPane />
      </div>
    </div>
  );
}
