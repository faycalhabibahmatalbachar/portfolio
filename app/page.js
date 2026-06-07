import { Analytics } from "@vercel/analytics/react";
import FadeIn from "./components/helper/fade-in";
import LoadingScreen from "./components/helper/loading-screen";
import AboutSection from "./components/homepage/about";
import Ventures from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import GitHubStats from "./components/homepage/github-stats";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Testimonials from "./components/homepage/testimonials";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div suppressHydrationWarning>
        <HeroSection />
        <FadeIn delay={0}><AboutSection /></FadeIn>
        <FadeIn delay={50}><Experience /></FadeIn>
        <FadeIn delay={50}><Skills /></FadeIn>
        <FadeIn delay={50}><Projects /></FadeIn>
        <FadeIn delay={50}><Education /></FadeIn>
        <FadeIn delay={50}><Ventures /></FadeIn>
        <FadeIn delay={50}><GitHubStats /></FadeIn>
        <FadeIn delay={50}><Testimonials /></FadeIn>
        <FadeIn delay={50}><ContactSection /></FadeIn>
      </div>
      <Analytics />
    </>
  );
}
