"use client";
import { useEffect, useState } from 'react';
import { projectsData, githubUser } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

const Projects = () => {
  // Set of public repo names (lowercased) fetched live from GitHub.
  const [publicRepos, setPublicRepos] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadPublicRepos() {
      try {
        const all = [];
        // GitHub paginates; fetch up to 200 public repos
        for (let page = 1; page <= 2; page++) {
          const res = await fetch(
            `https://api.github.com/users/${githubUser}/repos?per_page=100&page=${page}&type=public`,
            { headers: { Accept: 'application/vnd.github+json' } }
          );
          if (!res.ok) break;
          const data = await res.json();
          all.push(...data.map((r) => r.name.toLowerCase()));
          if (data.length < 100) break;
        }
        if (!cancelled) setPublicRepos(new Set(all));
      } catch {
        // Network/API error → leave as null (all stay "Private" as configured)
        if (!cancelled) setPublicRepos(new Set());
      }
    }
    loadPublicRepos();
    return () => { cancelled = true; };
  }, []);

  // A project is public if GitHub confirms its repo is in the public list.
  const isProjectPublic = (project) => {
    if (!publicRepos || !project.repo) return false;
    return publicRepos.has(project.repo.toLowerCase());
  };

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <span className="bg-[#0c1a2e] border border-[#1a3a5c] flex-shrink-0 w-fit text-white px-6 py-3 text-base font-semibold rounded-lg">
          Projects
        </span>
        <span className="w-full h-[1px] bg-gradient-to-r from-[#1a3a5c] to-transparent"></span>
        <span className="flex-shrink-0 text-xs text-gray-500">{projectsData.length} projects</span>
      </div>

      {/* Grid layout — all projects visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, index) => {
          const isPublic = isProjectPublic(project);
          return (
            <ProjectCard
              key={index}
              project={{
                ...project,
                isPrivate: !isPublic,
                code: isPublic ? `https://github.com/${githubUser}/${project.repo}` : '',
              }}
              loading={publicRepos === null}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
