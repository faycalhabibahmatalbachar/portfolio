import Link from "next/link";
import { BsArrowUpRight, BsDownload, BsGithub, BsLinkedin, BsEnvelope } from "react-icons/bs";
import { personalData } from "@/utils/data/personal-data";

const featuredProducts = [
  {
    name: "Toumaï AI",
    category: "Artificial intelligence",
    detail: "Multilingual assistant and AI-powered workflows",
    href: "https://toumaiai.com/",
    index: "01",
  },
  {
    name: "Lycée Guergné La Renaissance",
    category: "Education technology",
    detail: "School management and family communication",
    href: "https://lycee-guergne-renaissance.vercel.app/",
    index: "02",
  },
  {
    name: "235SMS",
    category: "Communication infrastructure",
    detail: "SMS, OTP and business messaging APIs",
    href: "https://235sms.pages.dev/",
    index: "03",
  },
];

export default function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative isolate pt-12 pb-14 sm:pt-20 lg:pt-24 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-[-15%] h-80 w-80 rounded-full bg-[#00d4ff]/10 blur-3xl" />
        <div className="absolute top-1/4 right-[-10%] h-72 w-72 rounded-full bg-[#f97316]/10 blur-3xl" />
      </div>
      <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div>
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3 py-2 text-xs font-medium text-emerald-300">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            Open to engineering roles and collaborations
          </div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#6de3f7] sm:text-sm">
            Software Engineer · AI Builder · Technology Founder
          </p>
          <h1 id="hero-heading" className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl xl:text-[3.5rem]">
            Hi, I&apos;m Faycal Habib Ahmat.
            <span className="mt-3 block text-[#6de3f7]">I build software that solves real problems.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
            Based in N&apos;Djamena, Chad, I design and ship web platforms, AI systems
            and digital products. I&apos;m the founder of Toumaï AI and co-founder of 235SMS.
          </p>
          <div className="mt-7 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
            {["Full-stack engineering", "AI & automation", "Web & mobile products"].map((area) => (
              <span key={area} className="rounded-full border border-[#29435b] bg-[#0c1a2e] px-3 py-2">{area}</span>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/#selected-work" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00b8d9] px-5 py-3 text-sm font-bold text-[#03111c] transition-colors hover:bg-[#6de3f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6de3f7]">
              Explore my work <BsArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#45617c] bg-[#0c1a2e] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#6de3f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6de3f7]">
              Let&apos;s talk <BsEnvelope aria-hidden="true" />
            </Link>
            <a href="/cv_faycal_habib.pdf" download className="inline-flex min-h-12 items-center gap-2 px-2 py-3 text-sm font-semibold text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6de3f7]">
              <BsDownload aria-hidden="true" /> Résumé
            </a>
          </div>
          <div className="mt-8 flex items-center gap-5 text-slate-400">
            <a href={personalData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="rounded p-1 hover:text-[#6de3f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6de3f7]"><BsGithub size={21} /></a>
            <a href={personalData.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="rounded p-1 hover:text-[#6de3f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6de3f7]"><BsLinkedin size={21} /></a>
            <span className="text-xs text-slate-500">N&apos;Djamena, Chad · Remote collaboration</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-[#29435b] bg-[#0a192b]/95 p-5 shadow-2xl shadow-black/25 sm:p-7">
          <div className="mb-6 flex items-center justify-between border-b border-[#29435b] pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6de3f7]">Selected products</p>
              <h2 className="mt-2 text-xl font-bold text-white">From idea to production</h2>
            </div>
            <span aria-hidden="true" className="rounded-xl border border-[#29435b] bg-[#10283d] p-3 text-[#6de3f7]"><BsArrowUpRight size={22} /></span>
          </div>
          <div className="space-y-3">
            {featuredProducts.map((product) => (
              <a key={product.name} href={product.href} target="_blank" rel="noopener noreferrer"
                className="group flex min-h-[108px] items-start gap-4 rounded-2xl border border-[#29435b] bg-[#0e2237] p-4 transition-colors hover:border-[#6de3f7]/60 hover:bg-[#13314a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6de3f7]">
                <span className="font-mono text-xs text-[#6de3f7]">{product.index}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">{product.name}</span>
                  <span className="mt-1 block text-xs text-[#6de3f7]">{product.category}</span>
                  <span className="mt-2 block text-xs leading-relaxed text-slate-400">{product.detail}</span>
                </span>
                <BsArrowUpRight aria-hidden="true" className="shrink-0 text-slate-400 group-hover:text-[#6de3f7]" />
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-slate-500">Selected work spans AI, education and communication software. Detailed case studies below.</p>
        </div>
      </div>
    </section>
  );
}
