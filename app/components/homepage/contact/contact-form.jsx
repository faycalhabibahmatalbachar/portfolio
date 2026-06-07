"use client";
import emailjs from "@emailjs/browser";
import { isValidEmail } from "@/utils/check-email";
import { useRef, useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { BsWhatsapp } from "react-icons/bs";
import { toast } from "react-toastify";

// ─── EmailJS Config ────────────────────────────────────────────────────────────
// These keys are public by design (used in client-side JS). EmailJS protects
// against abuse via domain allow-list + rate limiting, not key secrecy.
// Template variables used: {{name}}, {{email}}, {{message}}, {{title}}
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "service_a0j8rnb";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_janea8d";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || "rtLfXBQ0YO3Nx88FU";

const WHATSAPP_NUMBER = "23591912191"; // +235 91912191

function ContactForm() {
  const formRef = useRef(null);
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [userInput, setUserInput] = useState({ name: "", email: "", message: "" });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    }
    if (error.email) return;
    setError({ required: false, email: false });

    setIsLoading(true);
    try {
      // Tentative EmailJS
      if (EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: userInput.name,
            email: userInput.email,
            message: userInput.message,
            title: `New message from ${userInput.name}`,
          },
          EMAILJS_PUBLIC_KEY
        );
        setSent(true);
        toast.success("✅ Message envoyé avec succès !");
        setUserInput({ name: "", email: "", message: "" });
      } else {
        // Fallback → WhatsApp si EmailJS pas configuré
        const waText = encodeURIComponent(
          `Bonjour Faycal ! Je m'appelle ${userInput.name} (${userInput.email}).\n\n${userInput.message}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank");
        setSent(true);
        toast.success("Ouverture WhatsApp...");
        setUserInput({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      // Fallback → ouvrir WhatsApp avec le message
      const waText = encodeURIComponent(
        `Bonjour Faycal ! Je m'appelle ${userInput.name} (${userInput.email}).\n\n${userInput.message}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank");
      toast.info("Message envoyé via WhatsApp");
      setUserInput({ name: "", email: "", message: "" });
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#00d4ff] text-sm uppercase tracking-widest">
        Send me a message
      </p>
      <div className="max-w-3xl text-white rounded-2xl border border-[#1a3a5c] bg-[#0c1a2e] p-5 lg:p-7">
        <p className="text-sm text-gray-400 mb-6">
          Have a project in mind or want to collaborate? I&apos;m always open to new opportunities.
        </p>

        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-white font-semibold text-lg mb-2">Message sent!</p>
            <p className="text-gray-400 text-sm mb-6">I&apos;ll get back to you as soon as possible.</p>
            <button
              onClick={() => setSent(false)}
              className="text-[#00d4ff] text-sm hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300 font-medium">Your Name</label>
              <input
                className="bg-[#050b18] w-full border rounded-xl border-[#1a3a5c] focus:border-[#00d4ff] ring-0 outline-none transition-all duration-300 px-4 py-3 text-sm text-white placeholder-gray-600"
                type="text"
                placeholder="John Doe"
                maxLength="100"
                required
                onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
                onBlur={checkRequired}
                value={userInput.name}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300 font-medium">Your Email</label>
              <input
                className="bg-[#050b18] w-full border rounded-xl border-[#1a3a5c] focus:border-[#00d4ff] ring-0 outline-none transition-all duration-300 px-4 py-3 text-sm text-white placeholder-gray-600"
                type="email"
                placeholder="you@example.com"
                maxLength="100"
                required
                value={userInput.email}
                onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                onBlur={() => {
                  checkRequired();
                  setError({ ...error, email: !isValidEmail(userInput.email) });
                }}
              />
              {error.email && <p className="text-xs text-red-400">Please provide a valid email.</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300 font-medium">Your Message</label>
              <textarea
                className="bg-[#050b18] w-full border rounded-xl border-[#1a3a5c] focus:border-[#00d4ff] ring-0 outline-none transition-all duration-300 px-4 py-3 text-sm text-white placeholder-gray-600 resize-none"
                placeholder="Tell me about your project..."
                maxLength="500"
                required
                onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
                onBlur={checkRequired}
                rows="5"
                value={userInput.message}
              />
            </div>

            {error.required && <p className="text-xs text-red-400 text-center">All fields are required.</p>}

            <div className="flex flex-col gap-3">
              {/* Bouton principal : Send Message */}
              <button
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#f97316] px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#00d4ff]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleSendMail}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <TbMailForward size={17} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <span className="flex-1 h-[1px] bg-[#1a3a5c]"></span>
                <span className="text-xs text-gray-500">or contact directly</span>
                <span className="flex-1 h-[1px] bg-[#1a3a5c]"></span>
              </div>

              {/* Bouton WhatsApp */}
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-8 py-3 text-sm font-semibold text-[#25D366] transition-all duration-200 hover:bg-[#25D366]/20 hover:border-[#25D366]/60"
              >
                <BsWhatsapp size={17} />
                <span>WhatsApp +235 91912191</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
