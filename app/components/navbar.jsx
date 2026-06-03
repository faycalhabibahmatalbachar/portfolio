// @flow strict
"use client";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Experience" },
    { href: "/#skills", label: "Skills" },
    { href: "/#projects", label: "Projects" },
    { href: "/#education", label: "Education" },
    { href: "https://235sms.pages.dev/", label: "235SMS", external: true },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#f97316] text-white font-bold text-sm">
            FH
          </span>
          <span className="text-white font-semibold text-lg tracking-wide hidden sm:block">
            Faycal<span className="text-[#00d4ff]">.</span>dev
          </span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className={`px-4 py-2 text-sm transition-colors duration-300 rounded-md hover:bg-white/5 ${
                  link.external
                    ? "text-[#f97316] hover:text-[#f97316] font-medium"
                    : "text-gray-300 hover:text-[#00d4ff]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-[#00d4ff] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0c1a2e] rounded-xl border border-[#1a3a5c] mb-4">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className={`block px-6 py-3 text-sm hover:bg-white/5 transition-colors duration-200 ${
                    link.external ? "text-[#f97316] font-medium" : "text-gray-300 hover:text-[#00d4ff]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
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

export default Navbar;
