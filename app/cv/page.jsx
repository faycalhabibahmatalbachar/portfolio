"use client";
import dynamic from "next/dynamic";

// The whole builder is client-only: @react-pdf/renderer and the persisted
// zustand store cannot run during the static export prerender.
const Builder = dynamic(() => import("./components/Builder"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex items-center gap-3 text-gray-400 text-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00d4ff] animate-pulse" />
        Chargement du CV Studio…
      </div>
    </div>
  ),
});

export default function CVPage() {
  return <Builder />;
}
