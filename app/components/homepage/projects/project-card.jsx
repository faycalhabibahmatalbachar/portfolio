// @flow strict

import Link from 'next/link';
import * as React from 'react';
import { BsGithub } from 'react-icons/bs';
import { MdOutlineOpenInNew } from 'react-icons/md';

function ProjectCard({ project }) {
  return (
    <div className="from-[#050b18] border-[#1a3a5c] relative rounded-2xl border bg-gradient-to-br to-[#0c1a2e] w-full shadow-lg shadow-black/20">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-[#f97316]"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-[#f97316] to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-4 relative flex items-center justify-between">
        <div className="flex flex-row space-x-1 lg:space-x-2">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400/80"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-yellow-400/80"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-400/80"></div>
        </div>
        <p className="text-[#00d4ff] text-sm lg:text-base font-semibold tracking-wide">
          {project.name}
        </p>
        <div className="flex items-center gap-3">
          {project.code && (
            <Link href={project.code} target="_blank" className="text-gray-400 hover:text-[#00d4ff] transition-colors">
              <BsGithub size={16} />
            </Link>
          )}
          {project.demo && (
            <Link href={project.demo} target="_blank" className="text-gray-400 hover:text-[#f97316] transition-colors">
              <MdOutlineOpenInNew size={16} />
            </Link>
          )}
        </div>
      </div>
      <div className="overflow-hidden border-t border-[#1a3a5c] px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-[#f97316]">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-[#f97316]">=</span>
            <span className="text-gray-400">{"{"}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-[#00d4ff]">name:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-amber-300">{project.name}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>
          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-[#00d4ff]">stack:</span>
            <span className="text-gray-400">{` ['`}</span>
            {project.tools.map((tag, i) => (
              <React.Fragment key={i}>
                <span className="text-amber-300">{tag}</span>
                {project.tools?.length - 1 !== i && (
                  <span className="text-gray-400">{`', '`}</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-gray-400">{"],"}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-[#00d4ff]">role:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-[#f97316]">{project.role}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>
          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-[#00d4ff]">about:</span>
            <span className="text-gray-300">{' ' + project.description}</span>
          </div>
          <div><span className="text-gray-400">{"};"}</span></div>
        </code>
      </div>
    </div>
  );
}

export default ProjectCard;
