// @flow strict
import Link from 'next/link';
import { BsGithub, BsLock } from 'react-icons/bs';
import { MdOutlineOpenInNew } from 'react-icons/md';

function ProjectCard({ project }) {
  return (
    <div className="from-[#050b18] border-[#1a3a5c] relative rounded-2xl border bg-gradient-to-br to-[#0c1a2e] w-full shadow-lg shadow-black/20 flex flex-col hover:border-[#1a3a5c]/80 hover:shadow-[#00d4ff]/5 transition-all duration-300">
      {/* Top colored bar */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-[#f97316]"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-[#f97316] to-transparent"></div>
      </div>

      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between gap-2">
        <div className="flex flex-row space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80"></div>
        </div>

        <p className="text-[#00d4ff] text-sm font-semibold tracking-wide flex-1 text-center truncate px-2">
          {project.name}
        </p>

        <div className="flex items-center gap-2">
          {/* Private badge */}
          {project.isPrivate && (
            <span className="flex items-center gap-1 text-[10px] text-gray-500 border border-[#1a3a5c] bg-[#050b18] px-2 py-0.5 rounded-full">
              <BsLock size={9} />
              Private
            </span>
          )}

          {/* GitHub link */}
          {project.code && !project.isPrivate ? (
            <Link href={project.code} target="_blank"
              className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-200" aria-label="GitHub">
              <BsGithub size={16} />
            </Link>
          ) : project.isPrivate ? (
            <span title="Private repository" className="text-gray-600 cursor-default">
              <BsGithub size={16} />
            </span>
          ) : null}

          {/* Demo link */}
          {project.demo && (
            <Link href={project.demo} target="_blank"
              className="text-gray-400 hover:text-[#f97316] transition-colors duration-200" aria-label="Live demo">
              <MdOutlineOpenInNew size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="border-t border-[#1a3a5c] px-5 py-5 flex flex-col gap-3 flex-1">
        <p className="text-gray-300 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Private note */}
        {project.isPrivate && project.privateNote && (
          <div className="flex items-start gap-2 bg-[#1a3a5c]/20 border border-[#1a3a5c]/50 rounded-lg px-3 py-2">
            <BsLock size={11} className="text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500 italic">{project.privateNote}</p>
          </div>
        )}

        {/* Stack badges */}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tools.map((tool, i) => (
            <span key={i}
              className="text-xs px-2.5 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">
              {tool}
            </span>
          ))}
        </div>

        {/* Role + Live */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[#1a3a5c]/50">
          <span className="text-xs text-gray-500">Role:</span>
          <span className="text-xs text-[#f97316] font-medium">{project.role}</span>
          {project.demo && (
            <Link href={project.demo} target="_blank"
              className="ml-auto text-xs text-gray-400 hover:text-[#f97316] flex items-center gap-1 transition-colors">
              Live <MdOutlineOpenInNew size={11} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
