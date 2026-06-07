// @flow strict
"use client";
import FadeIn from "@/app/components/helper/fade-in";
import { projectsData, githubUser } from "@/utils/data/projects-data";
import { BsGithub, BsCodeSlash } from "react-icons/bs";
import { FiLayers, FiBox } from "react-icons/fi";
import { MdWorkspacesOutline } from "react-icons/md";
import Link from "next/link";

// Known programming languages (frameworks/tools excluded)
const KNOWN_LANGUAGES = [
  "TypeScript", "JavaScript", "Python", "Dart", "Java",
  "C++", "C", "Go", "Ruby", "PHP", "Kotlin", "Swift", "HTML", "CSS",
];

const LANG_COLORS = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Dart: "#00B4AB", HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219",
  "C++": "#f34b7d", C: "#555555", Go: "#00ADD8", Ruby: "#701516",
  PHP: "#4F5D95", Kotlin: "#A97BFF", Swift: "#F05138",
};

// ── Compute the real language distribution from actual projects ──────────────
function computeLanguages() {
  const count = {};
  projectsData.forEach((project) => {
    // Primary language = first known language found in the project's stack
    const primary = project.tools.find((t) => KNOWN_LANGUAGES.includes(t));
    if (primary) count[primary] = (count[primary] || 0) + 1;
  });
  const total = Object.values(count).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .map(([name, n]) => ({
      name,
      percent: Math.round((n / total) * 100),
      color: LANG_COLORS[name] || "#00d4ff",
    }));
}

function GitHubStats() {
  const languages = computeLanguages();
  const totalFrameworks = new Set(
    projectsData.flatMap((p) => p.tools.filter((t) => !KNOWN_LANGUAGES.includes(t)))
  ).size;

  const stats = [
    { icon: FiBox, label: "Projects Built", value: `${projectsData.length}`, color: "#00d4ff" },
    { icon: BsCodeSlash, label: "Languages", value: `${languages.length}`, color: "#f97316" },
    { icon: FiLayers, label: "Frameworks & Tools", value: `${totalFrameworks}+`, color: "#00d4ff" },
    { icon: MdWorkspacesOutline, label: "Companies Founded", value: "2", color: "#f97316" },
  ];

  return (
    <FadeIn delay={100}>
      <div id="github" className="relative z-50 border-t my-12 lg:my-24 border-[#1a3a5c]">
        <div className="flex justify-center -translate-y-[1px]">
          <div className="w-3/4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent w-full opacity-40" />
          </div>
        </div>

        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center gap-4">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#1a3a5c]" />
            <span className="bg-[#0c1a2e] border border-[#1a3a5c] text-white p-2 px-6 text-base font-semibold rounded-lg">
              Languages & Activity
            </span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1a3a5c]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i}
                className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#00d4ff]/40 transition-all duration-300 min-h-[120px]">
                <stat.icon size={24} style={{ color: stat.color }} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 text-center">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <BsCodeSlash className="text-[#00d4ff]" size={18} />
              <h3 className="text-white font-semibold">Most Used Languages</h3>
            </div>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">{lang.name}</span>
                    <span className="text-gray-500">{lang.percent}%</span>
                  </div>
                  <div className="h-2 bg-[#050b18] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${lang.percent}%`, background: lang.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile link */}
        <div className="flex justify-center mt-8">
          <Link href={`https://github.com/${githubUser}`} target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1a3a5c] text-gray-300 hover:text-[#00d4ff] hover:border-[#00d4ff]/40 transition-all duration-300 text-sm">
            <BsGithub size={16} /> View my profile on GitHub
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}

export default GitHubStats;
