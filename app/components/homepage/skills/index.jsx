// @flow strict

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";

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

      <div className="w-full my-12">
        <Marquee
          gradient={false}
          speed={60}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {skillsData.map((skill, id) => (
            <div
              className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-xl group relative hover:scale-110 cursor-pointer"
              key={id}
            >
              <div className="h-full w-full rounded-xl border border-[#1a3a5c] bg-[#0c1a2e] group-hover:border-[#00d4ff]/50 group-hover:shadow-lg group-hover:shadow-[#00d4ff]/10 transition-all duration-500">
                <div className="flex -translate-y-[1px] justify-center">
                  <div className="w-3/4">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 p-6">
                  <div className="h-8 sm:h-10">
                    <Image
                      src={skillsImage(skill)?.src}
                      alt={skill}
                      width={40}
                      height={40}
                      className="h-full w-auto rounded-lg"
                    />
                  </div>
                  <p className="text-white text-sm sm:text-base font-medium">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Skills;
