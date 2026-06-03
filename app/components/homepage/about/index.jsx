// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

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
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-4 text-[#00d4ff] text-sm uppercase tracking-widest">
            Who I am
          </p>
          <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
            {personalData.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-xl p-4">
              <p className="text-2xl font-bold text-[#00d4ff]">2+</p>
              <p className="text-xs text-gray-400 mt-1">Companies Founded</p>
            </div>
            <div className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-xl p-4">
              <p className="text-2xl font-bold text-[#f97316]">5+</p>
              <p className="text-xs text-gray-400 mt-1">Projects Shipped</p>
            </div>
            <div className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-xl p-4">
              <p className="text-2xl font-bold text-[#00d4ff]">3+</p>
              <p className="text-xs text-gray-400 mt-1">Years Experience</p>
            </div>
            <div className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-xl p-4">
              <p className="text-2xl font-bold text-[#f97316]">∞</p>
              <p className="text-xs text-gray-400 mt-1">Passion for Building</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center order-1 lg:order-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#f97316]/20 blur-xl scale-110"></div>
            <Image
              src={personalData.profile}
              width={300}
              height={300}
              alt="Faycal Habib Ahmat"
              className="relative rounded-2xl transition-all duration-700 grayscale hover:grayscale-0 hover:scale-105 cursor-pointer border border-[#1a3a5c]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
