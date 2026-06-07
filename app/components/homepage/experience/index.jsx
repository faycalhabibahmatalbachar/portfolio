// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#1a3a5c]">
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/section.svg`}
        alt="section background"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 opacity-20"
      />

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent w-full opacity-50" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center gap-4">
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#1a3a5c]"></span>
          <span className="bg-[#0c1a2e] border border-[#1a3a5c] w-fit text-white p-2 px-6 text-base font-semibold rounded-lg">
            Experience
          </span>
          <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1a3a5c]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-5">
              {experiences.map((exp) => (
                <GlowCard key={exp.id} identifier={`experience-${exp.id}`}>
                  <div className="p-4 relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/blur-23.svg`}
                      alt=""
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-30"
                    />
                    <div className="flex justify-start mb-2">
                      <span className="text-xs font-medium text-[#00d4ff] bg-[#00d4ff]/10 px-3 py-1 rounded-full border border-[#00d4ff]/20">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 px-2 py-3">
                      <div className="text-[#f97316] transition-all duration-300 hover:scale-110 flex-shrink-0">
                        <BsPersonWorkspace size={32} />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-white">
                          {exp.title}
                        </p>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
