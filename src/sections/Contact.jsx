import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [currentTime, setCurrentTime] = useState("");
  const [activeTab, setActiveTab] = useState("terminal"); // 'terminal' | 'direct'
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("mohammedali5072008@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || "service_default";
      const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || "template_default";
      const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY || "key_default";

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      setSubmitStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("success");
      setForm({ name: "", email: "", message: "" });
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding relative overflow-hidden bg-black">
      <div className="w-full max-w-7xl mx-auto md:px-10 px-4">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-12 md:mt-16 items-stretch">
          {/* LEFT: Contact Form (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 flex-1 flex flex-col justify-between border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.8)]"
              style={{
                background: "linear-gradient(180deg, rgba(18, 18, 22, 0.8) 0%, rgba(9, 9, 11, 0.95) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Send a Message
                </h3>
                <p className="text-zinc-400 text-sm mb-6">
                  Fill in the form below and I’ll get back to you within 24 hours.
                </p>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 rounded-xl bg-zinc-900 border border-white/20 text-white text-sm flex items-center gap-3">
                    <span className="text-lg">✓</span>
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-5"
                >
                  <div>
                    <label htmlFor="name" className="text-xs uppercase tracking-wider text-zinc-400 font-mono font-medium mb-1.5 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="What’s your name?"
                      required
                      className="w-full px-4 py-3.5 text-sm sm:text-base text-white bg-zinc-950/60 border border-zinc-800 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all duration-200 placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-xs uppercase tracking-wider text-zinc-400 font-mono font-medium mb-1.5 block">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                      className="w-full px-4 py-3.5 text-sm sm:text-base text-white bg-zinc-950/60 border border-zinc-800 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all duration-200 placeholder:text-zinc-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-xs uppercase tracking-wider text-zinc-400 font-mono font-medium mb-1.5 block">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, idea, or role..."
                      rows="4"
                      required
                      className="w-full px-4 py-3.5 text-sm sm:text-base text-white bg-zinc-950/60 border border-zinc-800 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all duration-200 placeholder:text-zinc-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-4 px-6 rounded-xl bg-white hover:bg-zinc-200 active:scale-[0.98] text-black font-semibold text-sm sm:text-base shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT: Dev Interactive Connect Hub (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className="rounded-2xl md:rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.8)]"
              style={{
                background: "linear-gradient(180deg, rgba(16, 16, 20, 0.8) 0%, rgba(8, 8, 10, 0.95) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Top Bar with Live Time and Status */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      Available for Opportunities
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-300">
                    <span className="text-white">🕒 PKT</span>
                    <span>{currentTime || "Islamabad, PK"}</span>
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-2 mt-6 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setActiveTab("terminal")}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === "terminal"
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                      }`}
                  >
                    👨‍💻 Dev Terminal
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("direct")}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === "direct"
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                      }`}
                  >
                    📬 Direct Channels
                  </button>
                </div>

                {/* Tab Content: Terminal */}
                {activeTab === "terminal" && (
                  <div className="mt-6 font-mono text-xs sm:text-sm bg-black/90 border border-white/10 rounded-xl p-4 sm:p-5 text-zinc-300 space-y-3 shadow-inner">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs pb-2 border-b border-white/5">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                      <span className="ml-2 text-zinc-400">ali@engineer-workspace ~ $</span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-white font-semibold">$ node -e 'console.log(developer.profile)'</p>
                      <div className="pl-3 border-l-2 border-zinc-700 text-zinc-300 space-y-1">
                        <p>{"{"}</p>
                        <p className="pl-4"><span className="text-zinc-400">"name"</span>: <span className="text-white font-medium">"Mohammed Ali"</span>,</p>
                        <p className="pl-4"><span className="text-zinc-400">"role"</span>: <span className="text-white font-medium">"Junior AI Application Engineer"</span>,</p>
                        <p className="pl-4"><span className="text-zinc-400">"degree"</span>: <span className="text-white font-medium">"BS Computer Science - CGPA 3.66/4.0 (IIUI)"</span>,</p>
                        <p className="pl-4"><span className="text-zinc-400">"certifications"</span>: [<span className="text-zinc-200">"Azure DevOps Expert (AZ-400)"</span>, <span className="text-zinc-200">"Azure Admin (AZ-104)"</span>, <span className="text-zinc-200">"GenAI Developer"</span>],</p>
                        <p className="pl-4"><span className="text-zinc-400">"interests"</span>: [<span className="text-zinc-200">"Computer Vision"</span>, <span className="text-zinc-200">"LLMs"</span>, <span className="text-zinc-200">"Full-Stack Web"</span>]</p>
                        <p>{"}"}</p>
                      </div>

                      <p className="text-white font-semibold pt-2">$ echo $AVAILABILITY</p>
                      <p className="text-zinc-200 pl-3">"Open to AI Engineer, ML Engineer & Full-Stack Developer roles."</p>
                    </div>
                  </div>
                )}

                {/* Tab Content: Direct Channels */}
                {activeTab === "direct" && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <a
                      href="mailto:mohammedali5072008@gmail.com"
                      className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200 group"
                    >
                      <div className="text-xs text-zinc-500 font-mono mb-1">Email Address</div>
                      <div className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors truncate">
                        mohammedali5072008@gmail.com
                      </div>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/mohammed-ali-3791062b2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200 group"
                    >
                      <div className="text-xs text-zinc-500 font-mono mb-1">LinkedIn</div>
                      <div className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">
                        in/mohammed-ali ↗
                      </div>
                    </a>

                    <a
                      href="https://github.com/MohammadAli-14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200 group"
                    >
                      <div className="text-xs text-zinc-500 font-mono mb-1">GitHub</div>
                      <div className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">
                        github.com/MohammadAli-14 ↗
                      </div>
                    </a>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                      <div className="text-xs text-zinc-500 font-mono mb-1">Location</div>
                      <div className="text-sm font-semibold text-white">
                        Islamabad, Pakistan 🇵🇰
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Copy Email Action Card */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-lg">
                      ✉️
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 font-mono">Prefer direct email?</p>
                      <p className="text-xs sm:text-sm font-semibold text-white select-all">
                        mohammedali5072008@gmail.com
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 active:scale-95 text-xs sm:text-sm font-medium text-white transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <span className="text-white">✓</span>
                        <span className="text-zinc-200">Copied!</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
