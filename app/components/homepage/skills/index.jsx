// @flow strict

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";

function Skills() {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[#1a3a5c]">
      <div className="w-[100px] h-[100px] bg-[#00d4ff] rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-10"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent w-full opacity-50" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center gap-4">
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#1a3a5c]"></span>
          <span className="bg-[#0c1a2e] border border-[#1a3a5c] w-fit text-white p-2 px-6 text-base font-semibold rounded-lg">
            Tech Stack
          </span>
          <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1a3a5c]"></span>
        </div>
      </div>

      {/* Static grid — no auto-scroll */}
      <div className="w-full my-10">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {skillsData.map((skill, id) => (
            <div
              key={id}
              className="w-28 sm:w-32 flex flex-col items-center justify-center transition-all duration-300 rounded-xl group hover:scale-105 cursor-pointer"
            >
              <div className="h-full w-full rounded-xl border border-[#1a3a5c] bg-[#0c1a2e] group-hover:border-[#00d4ff]/50 group-hover:shadow-lg group-hover:shadow-[#00d4ff]/10 transition-all duration-300">
                <div className="flex -translate-y-[1px] justify-center">
                  <div className="w-3/4">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 p-4 sm:p-5">
                  <div className="h-8 sm:h-9 flex items-center justify-center">
                    {skillsImage(skill) && (
                      <Image
                        src={skillsImage(skill).src}
                        alt={skill}
                        width={40}
                        height={40}
                        style={{ width: "auto", height: "100%" }}
                        className="rounded-lg"
                      />
                    )}
                  </div>
                  <p className="text-white text-xs sm:text-sm font-medium text-center">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
