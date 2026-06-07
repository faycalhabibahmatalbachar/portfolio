// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import TypewriterText from "../../helper/typewriter";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src={`${BASE}/hero.svg`}
        alt="background"
        width={1572}
        height={795}
        loading="eager"
        className="absolute -top-[98px] -z-10 opacity-40"
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        {/* Left: Text content */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">

          {/* Typewriter animated intro */}
          <div className="mb-6 min-h-[160px]">
            <TypewriterText
              lines={[
                "Hi, I'm Faycal",
                "Habib Ahmat",
                "CEO & Founder of ChadGPT",
                "Building AI & communication technologies for Africa.",
              ]}
              className="text-2xl lg:text-[2.2rem] font-extrabold leading-tight text-white"
            />
          </div>

          {/* Venture badges */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-sm text-gray-400">Co-founder of</span>
            <Link
              href="https://235sms.pages.dev/"
              target="_blank"
              className="text-sm font-semibold text-[#f97316] border border-[#f97316]/30 bg-[#f97316]/10 px-3 py-1 rounded-full hover:bg-[#f97316]/20 transition-all duration-200"
            >
              235SMS ↗
            </Link>
          </div>

          {/* Social icons */}
          <div className="mb-8 flex items-center gap-4">
            <Link href={personalData.github} target="_blank"
              className="text-gray-400 hover:text-[#00d4ff] transition-all duration-300 hover:scale-110" aria-label="GitHub">
              <BsGithub size={22} />
            </Link>
            <Link href={personalData.linkedIn} target="_blank"
              className="text-gray-400 hover:text-[#00d4ff] transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
              <BsLinkedin size={22} />
            </Link>
            <Link href={personalData.facebook} target="_blank"
              className="text-gray-400 hover:text-[#00d4ff] transition-all duration-300 hover:scale-110" aria-label="Facebook">
              <FaFacebook size={22} />
            </Link>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="#contact"
              className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] p-[1px] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/20">
              <button className="px-6 py-3 bg-[#050b18] rounded-full text-sm font-medium tracking-wide text-white flex items-center gap-2 hover:gap-3 transition-all duration-200">
                <span>Contact me</span>
                <RiContactsFill size={15} />
              </button>
            </Link>

            {personalData.resume && (
              <Link href={personalData.resume} target="_blank"
                className="flex items-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#f97316] px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#f97316]/20">
                <span>Resume</span>
                <MdDownload size={15} />
              </Link>
            )}
          </div>
        </div>

        {/* Right: Code card */}
        <div className="order-1 lg:order-2 from-[#050b18] border-[#1a3a5c] relative rounded-2xl border bg-gradient-to-br to-[#0c1a2e] shadow-xl shadow-[#00d4ff]/5">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-[#f97316]"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#f97316] to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-4">
            <div className="flex flex-row items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400/80"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400/80"></div>
              <div className="h-3 w-3 rounded-full bg-green-400/80"></div>
              <span className="ml-3 text-xs text-gray-500 font-mono">profile.ts</span>
            </div>
          </div>
          <div className="overflow-hidden border-t border-[#1a3a5c] px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div>
                <span className="mr-2 text-[#f97316]">const</span>
                <span className="mr-2 text-white">developer</span>
                <span className="mr-2 text-[#f97316]">=</span>
                <span className="text-gray-400">{"{"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-[#00d4ff]">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">Faycal Habib Ahmat</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-[#00d4ff]">title:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">Full-Stack Engineer & AI Builder</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-[#00d4ff]">ventures:</span>
                <span className="text-gray-400">{` ['`}</span>
                <span className="text-amber-300">ChadGPT</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">235SMS</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-[#00d4ff]">stack:</span>
                <span className="text-gray-400">{` ['`}</span>
                <span className="text-amber-300">TypeScript</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Python</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Next.js</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Flutter</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-[#00d4ff]">focus:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">AI for Africa 🌍</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-[#00d4ff]">openToWork:</span>
                <span className="text-green-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div><span className="text-gray-400">{"};"}</span></div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
