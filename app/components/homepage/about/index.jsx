// @flow strict
"use client";
import AnimatedCounter from "@/app/components/helper/animated-counter";
import FadeIn from "@/app/components/helper/fade-in";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

const stats = [
  { value: 2, suffix: "+", label: "Companies Founded", color: "#00d4ff" },
  { value: 14, suffix: "+", label: "Projects Shipped", color: "#f97316" },
  { value: 3, suffix: "+", label: "Years Experience", color: "#00d4ff" },
  { value: 50, suffix: "+", label: "Students Trained", color: "#f97316" },
];

function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#0c1a2e] border border-[#1a3a5c] w-fit text-[#00d4ff] rotate-90 p-2 px-5 text-sm font-medium rounded-md tracking-widest uppercase">
          About Me
        </span>
        <span className="h-36 w-[1px] bg-gradient-to-b from-[#1a3a5c] to-transparent"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <FadeIn direction="right" delay={100} className="order-2 lg:order-1">
          <p className="font-medium mb-4 text-[#00d4ff] text-sm uppercase tracking-widest">
            Who I am
          </p>
          <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
            {personalData.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-xl p-4 hover:border-[#1a3a5c]/60 transition-all duration-300 hover:shadow-lg group"
                style={{ "--c": stat.color }}
              >
                <p className="text-2xl font-bold transition-transform duration-300 group-hover:scale-110" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={200} className="flex justify-center order-1 lg:order-2">
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#f97316]/20 blur-xl scale-110 group-hover:from-[#00d4ff]/30 group-hover:to-[#f97316]/30 transition-all duration-700"></div>
            {/* Animated ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#00d4ff]/30 to-[#f97316]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <Image
              src={`${BASE}${personalData.profile}`}
              width={300}
              height={300}
              alt="Faycal Habib Ahmat"
              className="relative rounded-2xl transition-all duration-700 grayscale hover:grayscale-0 hover:scale-105 cursor-pointer border border-[#1a3a5c]"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-3 -right-3 bg-[#0c1a2e] border border-[#1a3a5c] rounded-xl px-3 py-2 shadow-lg">
              <p className="text-xs text-[#00d4ff] font-semibold">🌍 Chad, Africa</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default AboutSection;
