"use client";
import { BsWhatsapp } from "react-icons/bs";

const WHATSAPP_NUMBER = "23591912191";

export default function WhatsAppFloat() {
  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour Faycal ! Je vous contacte depuis votre portfolio.")}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={openWhatsApp}
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 overflow-hidden rounded-full shadow-lg shadow-[#25D366]/30 transition-all duration-300"
    >
      {/* Label qui apparaît au hover */}
      <span className="max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap text-sm font-semibold text-white bg-[#25D366] pl-0 group-hover:pl-4 pr-0 group-hover:pr-2 py-3 transition-all duration-300">
        +235 91912191
      </span>
      {/* Icône */}
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white hover:bg-[#1da851] transition-colors duration-200">
        <BsWhatsapp size={24} />
      </span>
    </button>
  );
}
