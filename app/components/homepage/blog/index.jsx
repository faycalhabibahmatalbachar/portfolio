// @flow strict
import Link from 'next/link';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { BsGithub } from 'react-icons/bs';

const ventures = [
  {
    id: 1,
    name: 'ChadGPT',
    tagline: 'AI for French-speaking Africa',
    description: 'AI platform bringing accessible artificial intelligence to Chad and French-speaking Africa. Provides AI-powered tools for text generation, automation, and productivity tailored for the African context.',
    status: 'Active',
    tags: ['AI', 'Next.js', 'OpenAI API', 'TypeScript'],
    color: '#00d4ff',
    demo: 'https://aiforchad.vercel.app/',
    code: 'https://github.com/faycalhabibahmatalbachar/chadgpt',
  },
  {
    id: 2,
    name: '235SMS',
    tagline: 'SMS & Communication Platform',
    description: 'Modern communication platform for businesses in Chad (+235) and Central Africa. Bulk SMS, OTP authentication, and a developer-friendly API for seamless customer communication.',
    status: 'Live',
    tags: ['SMS', 'API', 'React', 'Node.js', 'Cloudflare'],
    color: '#f97316',
    demo: 'https://235sms.pages.dev',
    code: 'https://github.com/faycalhabibahmatalbachar',
  },
];

function Ventures() {
  return (
    <div id="ventures" className="relative z-50 border-t my-12 lg:my-24 border-[#1a3a5c]">
      <div className="w-[100px] h-[100px] bg-[#f97316] rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-10"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent w-full opacity-40" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center gap-4">
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#1a3a5c]"></span>
          <span className="bg-[#0c1a2e] border border-[#1a3a5c] w-fit text-white p-2 px-6 text-base font-semibold rounded-lg">
            My Ventures
          </span>
          <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1a3a5c]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {ventures.map((venture) => (
          <div
            key={venture.id}
            className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-2xl p-6 hover:border-[#1a3a5c]/80 transition-all duration-300 hover:shadow-lg flex flex-col gap-4"
            style={{ boxShadow: `0 0 0 0 ${venture.color}` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold" style={{ color: venture.color }}>
                    {venture.name}
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      color: venture.status === 'Live' ? '#4ade80' : '#00d4ff',
                      background: venture.status === 'Live' ? 'rgba(74,222,128,0.1)' : 'rgba(0,212,255,0.1)',
                      border: `1px solid ${venture.status === 'Live' ? 'rgba(74,222,128,0.2)' : 'rgba(0,212,255,0.2)'}`,
                    }}
                  >
                    ● {venture.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{venture.tagline}</p>
              </div>
              <div className="flex items-center gap-3">
                {venture.code && (
                  <Link href={venture.code} target="_blank"
                    className="text-gray-500 hover:text-[#00d4ff] transition-colors">
                    <BsGithub size={18} />
                  </Link>
                )}
                {venture.demo && (
                  <Link href={venture.demo} target="_blank"
                    className="text-gray-500 hover:text-[#f97316] transition-colors">
                    <MdOutlineOpenInNew size={18} />
                  </Link>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {venture.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {venture.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[#050b18] text-gray-400 border border-[#1a3a5c]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ventures;
