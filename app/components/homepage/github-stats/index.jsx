// @flow strict
"use client";
import { useEffect, useState } from "react";
import FadeIn from "@/app/components/helper/fade-in";
import { BsGithub, BsStar, BsCodeSlash, BsPeople } from "react-icons/bs";
import { FiGitBranch } from "react-icons/fi";
import Link from "next/link";

const USERNAME = "faycalhabibahmatalbachar";

// Language → brand color for the bar chart
const LANG_COLORS = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Dart: "#00B4AB", HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219",
  Shell: "#89e051", "C++": "#f34b7d", C: "#555555", Go: "#00ADD8",
  Vue: "#41b883", Ruby: "#701516", PHP: "#4F5D95", Kotlin: "#A97BFF",
  Swift: "#F05138", Jupyter: "#DA5B0B",
};

function GitHubStats() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        // 1. User profile
        const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!userRes.ok) throw new Error("user");
        const user = await userRes.json();

        // 2. Repos (public) → aggregate languages + stars
        const repos = [];
        for (let page = 1; page <= 2; page++) {
          const r = await fetch(
            `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}`,
            { headers: { Accept: "application/vnd.github+json" } }
          );
          if (!r.ok) break;
          const batch = await r.json();
          repos.push(...batch);
          if (batch.length < 100) break;
        }

        const langCount = {};
        let totalStars = 0;
        repos.forEach((repo) => {
          totalStars += repo.stargazers_count || 0;
          if (repo.language) langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        });

        const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
        const languages = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 7)
          .map(([name, count]) => ({
            name,
            percent: Math.round((count / totalLangRepos) * 100),
            color: LANG_COLORS[name] || "#00d4ff",
          }));

        if (!cancelled) {
          setData({
            followers: user.followers,
            following: user.following,
            publicRepos: user.public_repos,
            totalStars,
            languages,
            avatar: user.avatar_url,
            name: user.name || USERNAME,
          });
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const stats = data
    ? [
        { icon: BsCodeSlash, label: "Public Repos", value: data.publicRepos, color: "#00d4ff" },
        { icon: BsStar, label: "Total Stars", value: data.totalStars, color: "#f97316" },
        { icon: BsPeople, label: "Followers", value: data.followers, color: "#00d4ff" },
        { icon: FiGitBranch, label: "Following", value: data.following, color: "#f97316" },
      ]
    : [];

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
              GitHub Activity
            </span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1a3a5c]" />
          </div>
        </div>

        {error ? (
          <div className="text-center py-8">
            <Link href={`https://github.com/${USERNAME}`} target="_blank"
              className="inline-flex items-center gap-2 text-[#00d4ff] hover:underline">
              <BsGithub size={18} /> View my GitHub profile
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {(data ? stats : Array(4).fill(null)).map((stat, i) => (
                <div key={i}
                  className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#00d4ff]/40 transition-all duration-300 min-h-[120px]">
                  {stat ? (
                    <>
                      <stat.icon size={24} style={{ color: stat.color }} />
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-[#1a3a5c] border-t-[#00d4ff] rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <BsCodeSlash className="text-[#00d4ff]" size={18} />
                <h3 className="text-white font-semibold">Most Used Languages</h3>
              </div>
              {data ? (
                <div className="space-y-3">
                  {data.languages.map((lang) => (
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
              ) : (
                <div className="flex items-center justify-center h-40">
                  <div className="w-6 h-6 border-2 border-[#1a3a5c] border-t-[#00d4ff] rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile link */}
        <div className="flex justify-center mt-8">
          <Link href={`https://github.com/${USERNAME}`} target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1a3a5c] text-gray-300 hover:text-[#00d4ff] hover:border-[#00d4ff]/40 transition-all duration-300 text-sm">
            <BsGithub size={16} /> View full profile on GitHub
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}

export default GitHubStats;
