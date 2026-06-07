"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg text-gray-400 hover:text-[#00d4ff] hover:bg-white/5 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <HiSun size={18} /> : <HiMoon size={18} />}
    </button>
  );
}
