"use client";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { href: "https://github.com/faycalhabibahmatalbachar", icon: BsGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/faycal-habib/", icon: BsLinkedin, label: "LinkedIn" },
  { href: "https://x.com/faycalhabib1", icon: FaXTwitter, label: "X / Twitter" },
  { href: "https://www.facebook.com/faycalhabibahmat", icon: FaFacebook, label: "Facebook" },
];

export default function SocialSidebar() {
  return (
    <div className="fixed left-4 bottom-1/3 z-50 hidden lg:flex flex-col items-center gap-4">
      {socials.map(({ href, icon: Icon, label }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          aria-label={label}
          className="text-gray-500 hover:text-[#00d4ff] transition-all duration-300 hover:scale-125 hover:-translate-y-1"
        >
          <Icon size={18} />
        </Link>
      ))}
      <div className="w-[1px] h-20 bg-gradient-to-b from-[#1a3a5c] to-transparent mt-2" />
    </div>
  );
}
