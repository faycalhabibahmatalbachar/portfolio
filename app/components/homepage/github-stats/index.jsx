// @flow strict
"use client";
import FadeIn from "@/app/components/helper/fade-in";

const USERNAME = "faycalhabibahmatalbachar";
const THEME = "dark"; // dark | radical | merko | gruvbox | tokyonight

function GitHubStats() {
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
            <span className="bg-[#0c1a2e] border border-[#1a3a5c] w-fit text-white p-2 px-6 text-base font-semibold rounded-lg">
              GitHub Activity
            </span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1a3a5c]" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 flex-wrap">
          {/* Stats card */}
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=transparent&title_color=00d4ff&text_color=ffffff&icon_color=f97316&border_color=1a3a5c&bg_color=0c1a2e&count_private=true&hide_border=false`}
            alt="GitHub Stats"
            className="rounded-2xl border border-[#1a3a5c] max-w-full hover:border-[#00d4ff]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/10"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />

          {/* Streak */}
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&theme=dark&background=0c1a2e&border=1a3a5c&ring=00d4ff&fire=f97316&currStreakLabel=00d4ff`}
            alt="GitHub Streak"
            className="rounded-2xl border border-[#1a3a5c] max-w-full hover:border-[#f97316]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#f97316]/10"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* Top Languages */}
        <div className="flex justify-center mt-4">
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=transparent&title_color=00d4ff&text_color=ffffff&border_color=1a3a5c&bg_color=0c1a2e&langs_count=8`}
            alt="Top Languages"
            className="rounded-2xl border border-[#1a3a5c] max-w-full hover:border-[#00d4ff]/40 transition-all duration-300"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      </div>
    </FadeIn>
  );
}

export default GitHubStats;
