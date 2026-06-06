"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

// Formspree endpoint — sign up at formspree.io and replace with your form ID
const FORMSPREE_URL = "https://formspree.io/f/faycalhabibahmat";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

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
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: userInput.name,
          email: userInput.email,
          message: userInput.message,
        }),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setUserInput({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#00d4ff] text-sm uppercase tracking-widest">
        Send me a message
      </p>
      <div className="max-w-3xl text-white rounded-2xl border border-[#1a3a5c] bg-[#0c1a2e] p-5 lg:p-7">
        <p className="text-sm text-gray-400 mb-6">
          {"Have a project in mind or want to collaborate? I'm always open to new opportunities."}
        </p>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 font-medium">Your Name</label>
            <input
              className="bg-[#050b18] w-full border rounded-xl border-[#1a3a5c] focus:border-[#00d4ff] ring-0 outline-none transition-all duration-300 px-4 py-3 text-sm text-white placeholder-gray-600"
              type="text"
              placeholder="Faycal Habib"
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
            {error.email && (
              <p className="text-xs text-red-400">Please provide a valid email.</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 font-medium">Your Message</label>
            <textarea
              className="bg-[#050b18] w-full border rounded-xl border-[#1a3a5c] focus:border-[#00d4ff] ring-0 outline-none transition-all duration-300 px-4 py-3 text-sm text-white placeholder-gray-600 resize-none"
              placeholder="Tell me about your project..."
              maxLength="500"
              name="message"
              required
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="5"
              value={userInput.message}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            {error.required && (
              <p className="text-xs text-red-400">All fields are required.</p>
            )}
            <button
              className="w-full flex items-center justify-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#f97316] px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#00d4ff]/20 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSendMail}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <TbMailForward size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
