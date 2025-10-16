import { motion } from "framer-motion";
import { Ban } from "lucide-react";

function Services() {
  // Function that handles Notify Me button click
  const handleNotify = () => {
    alert("🚀 Thanks! We'll notify you when new services are available.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-br from-gray-50 via-white to-gray-100 
                    p-6 relative overflow-hidden">
      
      {/* Background floating gradient orbs for visual appeal */}
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-500 
                   rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-yellow-300 to-red-400 
                   rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white shadow-2xl rounded-2xl p-10 
                   text-center max-w-md w-full"
      >
        {/* Icon */}
        <motion.div
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-4"
        >
          <Ban size={60} className="text-red-400" />
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🚧 Services Not Available Yet
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          We’re working hard to bring you awesome services soon.  
          Stay tuned for updates!
        </p>

        {/* Notify Me Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNotify}
          className="px-6 py-3 rounded-xl font-semibold text-white 
                     bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
                     shadow-lg hover:shadow-xl transition-all"
        >
          Notify Me
        </motion.button>
      </motion.div>

      {/* Floating smooth update message */}
      <motion.div
        className="absolute bottom-10 text-lg font-semibold bg-clip-text 
                   text-transparent bg-gradient-to-r from-yellow-300 
                   via-pink-400 to-purple-500 z-10"
        animate={{ x: [0, 10, -10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🔔 Keep checking back for updates!
      </motion.div>
    </div>
  );
}

export default Services;
