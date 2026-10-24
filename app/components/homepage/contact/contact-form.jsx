"use client";
import { useState } from "react";
import { BsArrowUpRight, BsWhatsapp } from "react-icons/bs";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

// EmailJS browser IDs are public by design; restrict allowed domains and quotas in EmailJS.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_a0j8rnb";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_janea8d";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "rtLfXBQ0YO3Nx88FU";
const WHATSAPP_NUMBER = "23591912191";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initial = { name: "", email: "", reason: "Job opportunity", message: "" };
const inputClass = "w-full rounded-xl border border-[#35516c] bg-[#050b18] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#6de3f7] focus-visible:ring-2 focus-visible:ring-[#6de3f7]/30";
const labelClass = "text-sm font-semibold text-slate-200";

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fallback, setFallback] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Faycal, my name is ${values.name || "a visitor"} (${values.email || "email not provided"}).\nTopic: ${values.reason}.\n\n${values.message}`
  )}`;

  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setFallback(false);

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();
    if (!name || !email || !message) {
      setErrorMessage("Please complete all required fields.");
      return;
    }
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setSending(true);
    try {
      if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        throw new Error("Contact service not configured");
      }
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            name,
            email,
            message: `Topic: ${values.reason}\n\n${message}`,
            title: `Portfolio inquiry: ${values.reason}`,
          },
        }),
      });
      if (!response.ok) throw new Error("Contact service unavailable");
      setSent(true);
      setValues(initial);
      toast.success("Your message was submitted.");
    } catch {
      // Opening WhatsApp is not equivalent to sending a message.
      // Keep the draft and let the visitor explicitly choose the fallback.
      setErrorMessage("Email delivery could not be initiated. Your draft is preserved; choose WhatsApp below or email me directly.");
      setFallback(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-white">Send me a message</h2>
      <p className="mb-6 text-sm leading-7 text-slate-400">Job opportunity, research collaboration or software project? Tell me what you have in mind.</p>

      <div className="rounded-2xl border border-[#29435b] bg-[#0c1a2e] p-5 sm:p-7">
        {sent ? (
          <div role="status" className="py-8 text-center">
            <span aria-hidden="true" className="text-4xl">✓</span>
            <h3 className="mt-4 text-lg font-bold text-white">Message submitted</h3>
            <p className="mt-2 text-sm text-slate-300">Your message was accepted by the contact service. I&apos;ll respond when possible.</p>
            <button type="button" onClick={() => setSent(false)} className="mt-6 min-h-11 rounded-lg border border-[#426582] px-4 py-2 text-sm font-semibold text-[#6de3f7] hover:border-[#6de3f7]">Send another message</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="contact-name" className={labelClass}>Your name <span aria-hidden="true">*</span></label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={100} className={inputClass} placeholder="Your full name" value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className={labelClass}>Email address <span aria-hidden="true">*</span></label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={150} className={inputClass} placeholder="you@example.com" value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-reason" className={labelClass}>What would you like to discuss?</label>
              <select id="contact-reason" name="reason" className={inputClass} value={values.reason} onChange={(e) => setValues((v) => ({ ...v, reason: e.target.value }))}>
                <option>Job opportunity</option>
                <option>Engineering project</option>
                <option>Research collaboration</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="contact-message" className={labelClass}>Message <span aria-hidden="true">*</span></label>
                <span className="text-xs text-slate-400">{values.message.length}/1200</span>
              </div>
              <textarea id="contact-message" name="message" required rows={5} maxLength={1200} className={`${inputClass} resize-y`} placeholder="Describe the opportunity or project…" value={values.message} onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))} />
            </div>
            {errorMessage && <p role="alert" className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">{errorMessage}</p>}
            {fallback && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#25D366]/50 px-4 py-3 text-sm font-semibold text-[#86efac] hover:bg-[#25D366]/10"><BsWhatsapp aria-hidden="true" /> Continue draft in WhatsApp <BsArrowUpRight aria-hidden="true" /></a>}
            <button type="submit" disabled={sending} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00b8d9] px-5 py-3 text-sm font-bold text-[#03111c] transition-colors hover:bg-[#6de3f7] disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6de3f7]">
              {sending ? "Sending…" : "Send message"} <TbMailForward aria-hidden="true" size={19} />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-3 border-t border-[#29435b] pt-4 text-xs">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[#86efac] hover:underline"><BsWhatsapp aria-hidden="true" /> WhatsApp</a>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a href="mailto:faycalhabibahmat@gmail.com" className="inline-flex min-h-11 items-center text-slate-300 hover:text-white hover:underline">Email directly</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
