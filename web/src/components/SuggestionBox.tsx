import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_d8shssb";
const TEMPLATE_ID = "template_7ag3rir";
const PUBLIC_KEY = "51y_J3-AuksNSIbGD";

type Status = "idle" | "sending" | "sent" | "error";

export default function SuggestionBox() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        title: "Suggestion",
        name: name || "Anonymous",
        email: email || "No email provided",
        message,
      }, PUBLIC_KEY);
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => { setOpen(!open); if (status === "sent" || status === "error") setStatus("idle"); }}
        className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
        aria-label="Send feedback"
      >
        <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        <span className="hidden md:inline">Suggestions</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-5 z-50">
          {status === "sent" ? (
            <div className="text-center py-4">
              <svg className="w-10 h-10 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className="text-sm font-medium text-gray-900">Thanks for your feedback!</p>
              <p className="text-xs text-gray-500 mt-1">We'll get back to you soon.</p>
              <button onClick={reset} className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-sm font-medium text-gray-900 mb-3">Send us feedback</p>

              <input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 placeholder:text-gray-400"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 placeholder:text-gray-400"
              />
              <textarea
                placeholder="Your suggestion or feedback..."
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 mb-3 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 placeholder:text-gray-400"
              />

              {status === "error" && (
                <p className="text-xs text-red-500 mb-2">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending" || !message.trim()}
                className="w-full text-sm font-medium bg-gray-900 text-white rounded-md py-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
