import { useState, useRef } from "react";

function Contact() {
  const [showPopup, setShowPopup] = useState(false);
  const [showTick, setShowTick] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const hasSubmittedRef = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    setShowPopup(true);

    // Clear form inputs
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";

  // Hide popup after 1.5 seconds, then show tick for 2.5 seconds
    setTimeout(() => {
      setShowPopup(false);
      setShowTick(true);

      setTimeout(() => {
        setShowTick(false);
        hasSubmittedRef.current = false;
      }, 2500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6 py-16 relative">
      {/* Form Container */}
      <div className="max-w-4xl w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-10">
        <h1 className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-center text-lg text-gray-700 mb-10">
          Have questions or feedback? Get in touch!{" "}
          <a
            href="mailto:support@resumegenerator.com"
            className="text-blue-600 font-semibold hover:underline"
          >
            support@resumegenerator.com
          </a>
        </p>

        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              ref={nameRef}
              id="name"
              type="text"
              placeholder="✨ Enter your full name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 
                         placeholder:text-gray-400 placeholder:italic placeholder:opacity-75
                         text-gray-800 bg-white/90
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none 
                         transition duration-300"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="📧 Your professional email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 
                         placeholder:text-gray-400 placeholder:italic placeholder:opacity-75
                         text-gray-800 bg-white/90
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none 
                         transition duration-300"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="message"
              className="block mb-2 font-semibold text-gray-700"
            >
              Message
            </label>
            <textarea
              ref={messageRef}
              id="message"
              placeholder="💬 Share your thoughts with us..."
              rows="5"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 
                         placeholder:text-gray-400 placeholder:italic placeholder:opacity-75
                         text-gray-800 bg-white/90
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none 
                         transition duration-300"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-10 py-3 rounded-xl font-semibold text-white 
                         bg-gradient-to-r from-blue-500 to-indigo-600 
                         shadow-lg hover:shadow-xl hover:scale-105 
                         transform transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
                         hover:brightness-110"
            >
              🚀 Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center animate-popup">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              ✨ We are Cooperative!
            </h2>
            <p className="text-gray-600">
              Thank you for reaching out. We&apos;ll get back to you soon!
            </p>
          </div>
        </div>
      )}

      {/* Tick + Sparkles */}
      {showTick && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 animate-fade-scale">
          <div className="relative w-24 h-24">
            {/* Sparkles */}
            <span className="sparkle top-0 left-1/2"></span>
            <span className="sparkle bottom-0 left-0"></span>
            <span className="sparkle bottom-1/2 right-0"></span>
            <span className="sparkle top-1/4 right-1/4"></span>

            <svg className="w-24 h-24 relative z-10" viewBox="0 0 52 52">
              <circle
                className="circle stroke-green-500"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                strokeWidth="4"
              />
              <path
                className="tick stroke-green-500"
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 27l7 7 16-16"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes popupIn {
            0% { opacity: 0; transform: scale(0.6) translateY(30px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-popup { animation: popupIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

          @keyframes fadeScale {
            0% { opacity: 0; transform: scale(0.6); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fade-scale { animation: fadeScale 0.6s ease-out forwards; }

          .circle {
            stroke-dasharray: 157;
            stroke-dashoffset: 157;
            animation: drawCircle 0.6s ease forwards;
          }
          @keyframes drawCircle { to { stroke-dashoffset: 0; } }

          .tick {
            stroke-dasharray: 34;
            stroke-dashoffset: 34;
            animation: drawTick 0.5s ease forwards 0.6s;
          }
          @keyframes drawTick { to { stroke-dashoffset: 0; } }

          .sparkle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #34D399;
            border-radius: 50%;
            opacity: 0;
            animation: sparkle 0.6s ease-out forwards;
          }
          .sparkle:nth-child(1) { animation-delay: 0.6s; transform: translate(-50%, 0); }
          .sparkle:nth-child(2) { animation-delay: 0.7s; }
          .sparkle:nth-child(3) { animation-delay: 0.8s; }
          .sparkle:nth-child(4) { animation-delay: 0.9s; }

          @keyframes sparkle {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1.3); }
            100% { opacity: 0; transform: scale(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Contact;
