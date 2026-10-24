import Link from "next/link";
import { BsArrowUpRight, BsCheckCircle } from "react-icons/bs";

const caseStudies = [
  {
    number: "01",
    title: "Toumaï AI",
    type: "AI platform",
    context: "Create useful AI experiences for users in Chad and francophone Africa.",
    contribution: "Product architecture, full-stack development, AI workflows and multi-platform integration.",
    delivery: "Web assistant, document workflows and WhatsApp integrations.",
    tech: ["Next.js", "FastAPI", "TypeScript", "Python"],
    href: "https://toumaiai.com/",
    cta: "Explore Toumaï AI",
  },
  {
    number: "02",
    title: "Lycée Guergné La Renaissance",
    type: "School management",
    context: "Bring student, class and family administration into one coherent platform.",
    contribution: "Full-stack application development, interface architecture and management workflows.",
    delivery: "Student and parent management, class administration and communication features under development.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
    href: "https://lycee-guergne-renaissance.vercel.app/",
    cta: "See the school platform",
  },
  {
    number: "03",
    title: "235SMS",
    type: "Communication technology",
    context: "Make application-to-customer messaging more accessible to businesses in Chad.",
    contribution: "Co-founding, product engineering and communication API development.",
    delivery: "Business messaging, OTP workflows and developer-oriented integrations.",
    tech: ["TypeScript", "React", "Node.js", "APIs"],
    href: "https://235sms.pages.dev/",
    cta: "Explore 235SMS",
  },
];

export default function SelectedWork() {
  return (
    <section id="selected-work" aria-labelledby="selected-work-title" className="scroll-mt-28 border-t border-[#233c56] py-14 sm:py-20">
      <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6de3f7]">Selected work</p>
          <h2 id="selected-work-title" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Real products. Real engineering.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">A closer look at the problems, my contributions and the software delivered. No invented impact metrics.</p>
        </div>
        <Link href="/#projects" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#6de3f7] hover:underline">All projects <BsArrowUpRight aria-hidden="true" /></Link>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <article key={study.number} className="flex h-full flex-col rounded-2xl border border-[#29435b] bg-[#0c1a2e] p-6 transition-colors hover:border-[#6de3f7]/50">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-sm text-[#6de3f7]">{study.number} / 03</span>
              <span className="rounded-full border border-[#385574] px-3 py-1 text-xs text-slate-300">{study.type}</span>
            </div>
            <h3 className="text-xl font-bold leading-snug text-white">{study.title}</h3>
            <dl className="mt-6 space-y-5 text-sm leading-6">
              <div>
                <dt className="mb-1 text-xs font-bold uppercase tracking-wide text-[#6de3f7]">Challenge</dt>
                <dd className="text-slate-300">{study.context}</dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-bold uppercase tracking-wide text-[#6de3f7]">My contribution</dt>
                <dd className="text-slate-300">{study.contribution}</dd>
              </div>
              <div>
                <dt className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#6de3f7]"><BsCheckCircle aria-hidden="true" /> What was built</dt>
                <dd className="text-slate-300">{study.delivery}</dd>
              </div>
            </dl>
            <div className="mt-7 flex flex-wrap gap-2">
              {study.tech.map((tool) => <span key={tool} className="rounded-md bg-[#102b41] px-2 py-1 text-xs text-slate-300">{tool}</span>)}
            </div>
            <a href={study.href} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 self-start rounded-lg border border-[#49708b] px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-[#6de3f7] hover:text-[#6de3f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6de3f7]">
              {study.cta} <BsArrowUpRight aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
