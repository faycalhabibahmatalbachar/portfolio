// @flow strict
"use client";
import FadeIn from "@/app/components/helper/fade-in";
import { useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Mahamat Ali Ibrahim",
    role: "Directeur Général",
    company: "ETS Habib et Fils, N'Djamena",
    avatar: "MA",
    color: "#00d4ff",
    text: "Faycal a développé notre système de gestion Canal+ avec une efficacité remarquable. Le bot WhatsApp qu'il a créé a complètement transformé notre service client. Nos abonnés peuvent désormais gérer leurs abonnements 24h/24 sans intervention humaine.",
  },
  {
    id: 2,
    name: "Aïcha Moussa",
    role: "Chef de Projet Digital",
    company: "Startup Fintech, Cameroun",
    avatar: "AM",
    color: "#f97316",
    text: "Faycal est un développeur exceptionnel. Il a livré notre plateforme de paiement en avance sur le calendrier, avec une qualité de code irréprochable. Sa maîtrise de TypeScript et Next.js est impressionnante pour un développeur africain de sa génération.",
  },
  {
    id: 3,
    name: "Dr. Oumar Hassan",
    role: "Professeur d'Informatique",
    company: "INSTA-Tchad, Abéché",
    avatar: "OH",
    color: "#00d4ff",
    text: "Faycal est l'un des étudiants les plus brillants que j'ai eu l'occasion d'encadrer. Sa capacité à apprendre rapidement et à appliquer des concepts avancés d'IA est remarquable. Il représente l'avenir de l'ingénierie informatique au Tchad.",
  },
  {
    id: 4,
    name: "Abdoulaye Kone",
    role: "CEO",
    company: "AfriTech Solutions, Côte d'Ivoire",
    avatar: "AK",
    color: "#f97316",
    text: "Nous avons collaboré avec Faycal sur le développement de notre application mobile Flutter. Son expertise en Dart et sa compréhension des marchés africains ont fait toute la différence. Livraison impeccable, communication irréprochable.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const t = testimonials[current];

  return (
    <FadeIn delay={100}>
      <div id="testimonials" className="relative z-50 border-t my-12 lg:my-24 border-[#1a3a5c]">
        <div className="flex justify-center -translate-y-[1px]">
          <div className="w-3/4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent w-full opacity-40" />
          </div>
        </div>

        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center gap-4">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#1a3a5c]" />
            <span className="bg-[#0c1a2e] border border-[#1a3a5c] text-white p-2 px-6 text-base font-semibold rounded-lg">
              Testimonials
            </span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1a3a5c]" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0c1a2e] border border-[#1a3a5c] rounded-2xl p-8 relative overflow-hidden transition-all duration-500">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5" style={{ background: t.color, filter: "blur(40px)" }} />

            {/* Quote icon */}
            <FaQuoteLeft className="text-[#1a3a5c] mb-4" size={32} />

            {/* Text */}
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 italic">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}44, ${t.color}22)`, border: `1px solid ${t.color}44` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role} · {t.company}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button onClick={prev} className="p-2 rounded-lg border border-[#1a3a5c] text-gray-400 hover:text-[#00d4ff] hover:border-[#00d4ff]/40 transition-all">
                  <FaChevronLeft size={12} />
                </button>
                <span className="text-xs text-gray-500">{current + 1}/{testimonials.length}</span>
                <button onClick={next} className="p-2 rounded-lg border border-[#1a3a5c] text-gray-400 hover:text-[#00d4ff] hover:border-[#00d4ff]/40 transition-all">
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-[#00d4ff]" : "w-2 h-2 bg-[#1a3a5c]"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
