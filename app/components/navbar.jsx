"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { href: "/#selected-work", label: "Selected work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "All projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav aria-label="Main navigation" className={`sticky top-0 z-50 -mx-6 px-6 transition-all duration-200 sm:-mx-12 sm:px-12 ${scrolled || menuOpen ? "border-b border-[#29435b] bg-[#050b18]/95 shadow-lg backdrop-blur-md" : "bg-[#050b18]/80 backdrop-blur-sm"}`}>
      <div className="flex min-h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="Faycal Habib Ahmat — home" className="inline-flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6de3f7]">
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00b8d9] text-sm font-extrabold text-[#03111c]">FH.</span>
          <span className="hidden font-bold tracking-tight text-white sm:inline">Faycal<span className="text-[#6de3f7]">.dev</span></span>
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6de3f7]">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden shrink-0 lg:block">
          <Link href="/cv/" className="inline-flex min-h-11 items-center rounded-xl border border-[#426582] px-4 text-sm font-semibold text-white transition-colors hover:border-[#6de3f7] hover:text-[#6de3f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6de3f7]">
            CV Studio
          </Link>
        </div>
        <button type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="portfolio-mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#29435b] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6de3f7] lg:hidden">
          {menuOpen ? <HiX aria-hidden="true" size={23} /> : <HiMenuAlt3 aria-hidden="true" size={23} />}
        </button>
      </div>
      {menuOpen && (
        <div id="portfolio-mobile-menu" className="border-t border-[#29435b] py-3 lg:hidden">
          <ul className="grid gap-1">
            {[...navLinks, { href: "/cv/", label: "CV Studio" }].map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center rounded-lg px-4 text-sm font-medium text-slate-200 hover:bg-[#102b41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6de3f7]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
