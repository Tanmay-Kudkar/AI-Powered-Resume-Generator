import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * LandingPage Component
 * ---------------------
 * A premium, animated landing page with:
 *  1. Hero Section - Animated gradient + CTA
 *  2. Features Section - Hover-animated feature cards
 *  3. Testimonials - Motion cards with avatars
 *  4. Floating background shapes for depth
 *  5. CTA Section - High-conversion banner
 *  6. Footer - Links and © branding
 */

const LandingPage = () => {
  return (
    <div className="relative bg-base-100 text-base-content overflow-hidden">
      {/* ===========================
          ✨ FLOATING BACKGROUND SHAPES
          Creates depth + modern SaaS vibe
      =========================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue floating blob */}
        <motion.div
          className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-3xl top-10 left-10"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Pink floating blob */}
        <motion.div
          className="absolute w-96 h-96 bg-pink-400/20 rounded-full blur-3xl bottom-10 right-10"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ===========================
          1️⃣ HERO SECTION
      =========================== */}
      <section className="hero min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white relative z-10">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            {/* Animated headline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-extrabold leading-tight drop-shadow-lg"
            >
              AI-Powered Resume Builder
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="py-6 text-xl"
            >
              Build a stunning, job-winning resume in just minutes.  
              Powered by advanced AI. No hassle, only results.
            </motion.p>

            {/* Call-to-Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/generate-resume"
                className="btn btn-primary btn-lg px-8 shadow-lg transition-all duration-300 hover:shadow-pink-400/50 hover:scale-110"
              >
                🚀 Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===========================
          2️⃣ FEATURES SECTION
      =========================== */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Why Choose Us?
          </motion.h2>

          {/* Feature Cards */}
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="card bg-base-200 shadow-lg hover:shadow-xl transition rounded-2xl"
              >
                <div className="card-body text-center">
                  <div className="text-6xl mb-4">{f.icon}</div>
                  <h3 className="card-title text-xl mb-2">{f.title}</h3>
                  <p className="text-sm opacity-80">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          3️⃣ TESTIMONIALS SECTION
      =========================== */}
      <section className="py-24 bg-base-200 relative z-10">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Loved by Professionals
          </motion.h2>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "This tool made creating my resume effortless! I landed 3 interviews within a week.",
                name: "John Doe",
                role: "Software Engineer",
                img: "https://randomuser.me/api/portraits/men/1.jpg",
              },
              {
                text: "The templates are beautiful and customizable. Perfect for job seekers!",
                name: "Jane Smith",
                role: "Marketing Specialist",
                img: "https://randomuser.me/api/portraits/women/2.jpg",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="card bg-base-100 shadow-xl rounded-2xl"
              >
                <div className="card-body">
                  <p className="italic">"{t.text}"</p>
                  <div className="flex items-center mt-4">
                    <div className="avatar">
                      <div className="w-14 rounded-full">
                        <img src={t.img} alt={t.name} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-sm opacity-80">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          4️⃣ CTA BANNER
      =========================== */}
      <section className="py-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-5xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <p className="mb-8 text-lg opacity-80">
            Join thousands of users who built professional resumes with AI.
          </p>
          <motion.div whileHover={{ scale: 1.08 }}>
            <Link
              to="/generate-resume"
              className="btn btn-primary btn-lg px-8 shadow-lg hover:shadow-pink-400/50"
            >
              Start Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ===========================
          5️⃣ FOOTER (FIXED Quick Links)
      =========================== */}
      <footer className="footer p-10 bg-neutral text-neutral-content relative z-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Footer Brand Info */}
          <div>
            <h4 className="footer-title">AI Resume Maker</h4>
            <p className="opacity-80">
              The easiest way to create a standout resume with AI assistance.
            </p>
          </div>

          {/* Footer Quick Links (fixed with spacing) */}
          <div>
            <h4 className="footer-title mb-4">Quick Links</h4>
            <ul className="space-y-2">
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
              © {new Date().getFullYear()} <strong>Tanmay Vijay Kudkar</strong>.  
              All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
