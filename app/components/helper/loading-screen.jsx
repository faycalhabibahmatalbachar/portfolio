"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setFadeOut(true), 1800);
    const hide = setTimeout(() => setVisible(false), 2300);
    return () => { clearTimeout(fade); clearTimeout(hide); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050b18] flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Logo animé */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-20 h-20 rounded-full border-2 border-[#00d4ff]/30 animate-ping" />
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#f97316] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#00d4ff]/30">
          FH
        </div>
      </div>

      {/* Nom */}
      <p className="text-white font-bold text-xl tracking-widest mb-1">FAYCAL HABIB</p>
      <p className="text-[#00d4ff] text-xs tracking-[0.4em] uppercase mb-8">Full-Stack · AI · Entrepreneur</p>

      {/* Barre de chargement */}
      <div className="w-48 h-[2px] bg-[#1a3a5c] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#00d4ff] to-[#f97316] rounded-full animate-[loadBar_1.8s_ease-in-out_forwards]" />
      </div>

      <style jsx>{`
        @keyframes loadBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
