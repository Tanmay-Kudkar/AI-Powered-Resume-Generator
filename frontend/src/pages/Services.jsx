import { motion } from "framer-motion";
import { Ban } from "lucide-react";
import { useEffect, useState } from "react";

function Services() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? document.documentElement.getAttribute("data-theme") || "light"
      : "light"
  );
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = () =>
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    const observer = new MutationObserver(handler);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Function that handles Notify Me button click
  const handleNotify = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1800);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#ffe4e6] text-gray-900"
      }`}
    >
      {/* Background floating gradient orbs for visual appeal */}
      <motion.div
        className={`absolute w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30
          ${
            theme === "dark"
              ? "bg-gradient-to-r from-pink-400 to-purple-500"
              : "bg-gradient-to-r from-blue-400 to-pink-300"
          }
        `}
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30
          ${
            theme === "dark"
              ? "bg-gradient-to-r from-yellow-300 to-red-400"
              : "bg-gradient-to-r from-yellow-300 to-pink-400"
          }
        `}
        animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative z-10 shadow-2xl rounded-2xl p-10 text-center max-w-md w-full
          ${
            theme === "dark"
              ? "bg-gray-900 border border-gray-700"
              : "bg-white/80 border border-blue-100 backdrop-blur-lg"
          }
        `}
        style={{
          boxShadow:
            theme === "dark"
              ? "0 8px 32px 0 rgba(40,40,60,0.6)"
              : "0 8px 32px 0 rgba(80,80,180,0.12)",
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-4"
        >
          <Ban
            size={60}
            className={theme === "dark" ? "text-red-300" : "text-pink-400"}
          />
        </motion.div>

        {/* Title */}
        <h1
          className={`text-2xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-blue-900"
          }`}
        >
          🚧 Services Not Available Yet
        </h1>

        {/* Subtitle */}
        <p
          className={`mb-6 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          We’re working hard to bring you awesome services soon. Stay tuned for
          updates!
        </p>

        {/* Notify Me Button */}
        <motion.button
          whileHover={{
            scale: 1.07,
            backgroundColor: theme === "dark" ? "#f472b6" : "#2563eb",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNotify}
          className={`px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all
            ${
              theme === "dark"
                ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
                : "bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-400 text-white"
            }`}
        >
          Notify Me
        </motion.button>
        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div
              className={`bg-white/90 ${
                theme === "dark" ? "text-gray-900" : "text-gray-900"
              } p-8 rounded-2xl shadow-2xl text-center animate-popup`}
            >
              <h2 className="text-2xl font-bold mb-2">🚀 Thanks!</h2>
              <p>We'll notify you when new services are available.</p>
            </div>
            <style>
              {`
                @keyframes popupIn {
                  0% { opacity: 0; transform: scale(0.7) translateY(30px);}
                  100% { opacity: 1; transform: scale(1) translateY(0);}
                }
                .animate-popup { animation: popupIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
              `}
            </style>
          </div>
        )}
      </motion.div>

      {/* Floating smooth update message */}
      <motion.div
        className={`absolute bottom-10 text-lg font-semibold z-10
          bg-clip-text text-transparent
          ${
            theme === "dark"
              ? "bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500"
              : "bg-gradient-to-r from-blue-400 via-pink-400 to-purple-600"
          }`}
        animate={{ x: [0, 10, -10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🔔 Keep checking back for updates!
      </motion.div>
    </div>
  );
}

export default Services;
