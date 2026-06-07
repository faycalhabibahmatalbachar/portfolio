import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

const Projects = () => {
  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <span className="bg-[#0c1a2e] border border-[#1a3a5c] flex-shrink-0 w-fit text-white px-6 py-3 text-base font-semibold rounded-lg">
          Projects
        </span>
        <span className="w-full h-[1px] bg-gradient-to-r from-[#1a3a5c] to-transparent"></span>
        <span className="flex-shrink-0 text-xs text-gray-500">{projectsData.length} repos</span>
      </div>

      {/* Grid layout — all projects visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
