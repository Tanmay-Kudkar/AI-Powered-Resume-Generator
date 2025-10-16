import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const getTheme = () =>
  typeof window !== "undefined"
    ? document.documentElement.getAttribute("data-theme") || "light"
    : "light";

const LandingPage = () => {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const handler = () => setTheme(getTheme());
    window.addEventListener("storage", handler);
    const observer = new MutationObserver(handler);
    observer.observe(document.documentElement, { attributes: true });
    return () => {
      window.removeEventListener("storage", handler);
      observer.disconnect();
    };
  }, []);

  // Vibrant gradients and blobs for light/dark
  const heroGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"
      : "bg-gradient-to-r from-[#2563eb]/80 via-[#a78bfa]/80 to-[#f472b6]/80";
  const blobBlue = theme === "dark" ? "bg-blue-400/30" : "bg-[#2563eb]/40";
  const blobPink = theme === "dark" ? "bg-pink-400/20" : "bg-[#f472b6]/30";

  // Footer styles for light/dark
  const footerBg =
    theme === "dark"
      ? "bg-neutral text-neutral-content"
      : "bg-gray-100 text-gray-800 shadow-lg rounded-t-xl border-t border-gray-200";

  // Animation settings for light/dark
  const blobBlueAnim =
    theme === "dark"
      ? { x: [0, 50, 0], y: [0, 30, 0] }
      : { x: [0, 80, 0], y: [0, 60, 0] };
  const blobPinkAnim =
    theme === "dark"
      ? { x: [0, -40, 0], y: [0, -30, 0] }
      : { x: [0, -80, 0], y: [0, -60, 0] };
  const blobBlueDuration = theme === "dark" ? 10 : 7;
  const blobPinkDuration = theme === "dark" ? 12 : 8;

  return (
    <div className="relative bg-base-100 text-base-content overflow-hidden">
      {/* FLOATING BACKGROUND SHAPES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue floating blob */}
        <motion.div
          className={`absolute w-72 h-72 ${blobBlue} rounded-full blur-3xl top-10 left-10`}
          animate={blobBlueAnim}
          transition={{
            duration: blobBlueDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Pink floating blob */}
        <motion.div
          className={`absolute w-96 h-96 ${blobPink} rounded-full blur-3xl bottom-10 right-10`}
          animate={blobPinkAnim}
          transition={{
            duration: blobPinkDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* HERO SECTION */}
      <section
        className={`hero min-h-screen ${heroGradient} relative z-10`}
        style={{ backdropFilter: "blur(2px)" }}
      >
        {/* Overlay for light mode */}
        {theme === "light" && (
          <div className="absolute inset-0 bg-white/10 pointer-events-none z-0" />
        )}
        <div className="hero-content text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Animated headline */}
            <motion.h1
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`text-6xl font-extrabold leading-tight drop-shadow-2xl ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
              style={{
                // Remove extra textShadow for light theme
                textShadow:
                  theme === "light"
                    ? "none"
                    : "0 4px 32px rgba(80,80,180,0.28)",
              }}
            >
              AI Powered Resume Generator
            </motion.h1>
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`py-6 text-xl ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
              style={{
                textShadow:
                  theme === "light"
                    ? "none"
                    : "0 2px 12px rgba(80,80,180,0.22)",
              }}
            >
              Build a stunning, job-winning resume in just minutes. Powered by
              advanced AI. No hassle, only results.
            </motion.p>
            {/* Call-to-Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link
                to="/generate-resume"
                className="btn btn-lg px-8 font-bold shadow-lg transition-all duration-300 hover:scale-110"
                style={{
                  background:
                    theme === "light"
                      ? "linear-gradient(90deg, #2563eb 0%, #a78bfa 60%, #f472b6 100%)"
                      : "linear-gradient(90deg, #7f5af0 0%, #ff6ac1 100%)",
                  color: theme === "light" ? "#fff" : "#fff",
                  border: "none",
                }}
              >
                🚀 Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl font-bold text-center mb-12 ${
              theme === "light" ? "text-blue-700" : "text-white"
            }`}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI-Powered",
                desc: "Generate a polished resume instantly with our cutting-edge AI.",
              },
              {
                icon: "📄",
                title: "Pro Templates",
                desc: "Choose from modern, recruiter-approved designs.",
              },
              {
                icon: "💼",
                title: "Job-Tailored",
                desc: "Optimize resumes for industries & roles with one click.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{
                  scale: 1.08,
                  boxShadow:
                    theme === "light"
                      ? "0 0 24px #2563eb33"
                      : "0 0 24px #7f5af0",
                }}
                className={`card shadow-lg hover:shadow-xl transition rounded-2xl ${
                  theme === "light"
                    ? "bg-white border border-blue-100"
                    : "bg-[#23272f] border-none"
                }`}
              >
                <div className="card-body text-center">
                  <div className="text-6xl mb-4">{f.icon}</div>
                  <h3
                    className={`card-title text-xl mb-2 ${
                      theme === "light" ? "text-blue-700" : "text-white"
                    }`}
                  >
                    {f.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section
        className={`py-24 ${
          theme === "light" ? "bg-blue-50" : "bg-base-200"
        } relative z-10`}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl font-bold text-center mb-12 ${
              theme === "light" ? "text-blue-700" : "text-white"
            }`}
          >
            Loved by Professionals
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "This tool made creating my resume effortless! I landed 3 interviews within a week.",
                name: "Ritikesh Nayak",
                role: "DevOps Engineer",
                img: "https://randomuser.me/api/portraits/men/76.jpg",
              },
              {
                text: "The templates are beautiful and customizable. Perfect for job seekers!",
                name: "Pravin Rathod",
                role: "Backend Developer",
                img: "https://randomuser.me/api/portraits/men/71.jpg",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    theme === "light"
                      ? "0 0 24px #2563eb33"
                      : "0 0 24px #7f5af0",
                }}
                className={`card shadow-xl rounded-2xl ${
                  theme === "light"
                    ? "bg-white border border-blue-100"
                    : "bg-base-100"
                }`}
              >
                <div className="card-body">
                  <p
                    className={`italic mb-4 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    &quot;{t.text}&quot;
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="avatar">
                      <div className="w-14 rounded-full">
                        <img src={t.img} alt={t.name} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4
                        className={`font-bold ${
                          theme === "light" ? "text-blue-700" : "text-white"
                        }`}
                      >
                        {t.name}
                      </h4>
                      <p
                        className={`text-sm ${
                          theme === "light" ? "text-gray-700" : "text-white"
                        }`}
                      >
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className={`py-24 text-center relative z-10 ${
          theme === "light" ? "bg-pink-50" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <h2
            className={`text-5xl font-bold mb-6 ${
              theme === "light" ? "text-pink-700" : ""
            }`}
          >
            Ready to Land Your Dream Job?
          </h2>
          <p className="mb-8 text-lg opacity-80">
            Join thousands of users who built professional resumes with AI.
          </p>
          <motion.div whileHover={{ scale: 1.08 }}>
            <Link
              to="/generate-resume"
              className="btn btn-primary btn-lg px-8 shadow-lg hover:shadow-pink-400/50"
              style={{
                background:
                  theme === "light"
                    ? "linear-gradient(90deg, #2563eb 0%, #a78bfa 60%, #f472b6 100%)"
                    : "",
                color: theme === "light" ? "#fff" : "",
                border: "none",
              }}
            >
              Start Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className={`footer p-10 ${footerBg} relative z-10`}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Footer Brand Info */}
          <div>
            <h4 className="footer-title font-bold">
              AI Powered Resume Generator
            </h4>
            <p className="opacity-80">
              The easiest way to create a standout resume with AI assistance.
            </p>
          </div>
          {/* Footer Quick Links */}
          <div>
            <h4 className="footer-title mb-4 font-bold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="link link-hover">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link link-hover">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          {/* Footer Copyright */}
          <div className="flex flex-col justify-between">
            <p className="text-sm">
              © {new Date().getFullYear()}{" "}
              <div className="mt-2 mb-2">
                <span className="font-bold text-blue-600 block">
                  Tanmay Vijay Kudkar
                </span>
                <span className="font-bold text-blue-600 block">
                  Ritikesh Nayak
                </span>
                <span className="font-bold text-blue-600 block">
                  Atharva Raut
                </span>
                <span className="font-bold text-blue-600 block">
                  Pravin Rathod
                </span>
                <span className="font-bold text-blue-600 block">
                  (Team AI Powered Resume Generator)
                </span>
              </div>
              <span className="text-xs opacity-80">
                All Rights Reserved by us.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
