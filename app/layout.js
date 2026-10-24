import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CursorGlow from "./components/helper/cursor-glow";
import ScrollProgress from "./components/helper/scroll-progress";
import ScrollToTop from "./components/helper/scroll-to-top";
import SocialSidebar from "./components/helper/social-sidebar";
import WhatsAppFloat from "./components/helper/whatsapp-float";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const siteUrl = "https://faycalhabibahmat.is-a.dev";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Faycal Habib Ahmat | Software Engineer & AI Product Builder",
  description: "Portfolio of Faycal Habib Ahmat, a software engineer based in Chad. Explore Toumaï AI, 235SMS, education software, full-stack engineering and AI projects.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Faycal Habib Ahmat | Software Engineer & AI Product Builder",
    description: "Real-world software, AI products and full-stack engineering projects built from Chad.",
    url: siteUrl,
    siteName: "Faycal Habib Ahmat",
    type: "profile",
    images: [{ url: "/profile.jpg", alt: "Portrait of Faycal Habib Ahmat" }],
  },
  twitter: {
    card: "summary",
    title: "Faycal Habib Ahmat | Software Engineer",
    description: "Full-stack engineering, AI products and digital platforms.",
    images: ["/profile.jpg"],
  },
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Faycal Habib Ahmat",
  url: siteUrl,
  jobTitle: "Software Engineer",
  address: { "@type": "PostalAddress", addressLocality: "N'Djamena", addressCountry: "TD" },
  sameAs: [
    "https://github.com/faycalhabibahmatalbachar",
    "https://www.linkedin.com/in/faycal-habib/",
    "https://x.com/faycalhabib1",
  ],
  knowsAbout: ["Software engineering", "Artificial intelligence", "Full-stack development"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#050b18]">
          Skip to main content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }} />
        <ScrollProgress />
        <CursorGlow />
        <WhatsAppFloat />
        <ToastContainer />
        <SocialSidebar />
        <main id="main-content" className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
