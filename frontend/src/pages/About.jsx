import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 via-white to-gray-100 flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            About Us
          </h1>
          <p className="text-lg mb-6 text-gray-600 leading-relaxed">
            Welcome to <span className="font-semibold text-indigo-600">AI Powered Resume Generator</span>, 
            your one-stop solution to build a professional resume in minutes. 
            We use advanced AI to create polished, job-winning resumes tailored 
            to your career goals.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Whether you’re starting your career or leveling up, our platform 
            simplifies resume creation with industry-specific templates and 
            AI-powered insights — making job applications stress-free. 
            Join our community of successful job seekers today!
          </p>

          {/* Learn More Button */}
          <motion.a
            href="/contact"
            className="inline-block mt-6 px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </motion.div>

        {/* Right Side: smooth hover glow */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="https://img.freepik.com/free-vector/resume-writing-concept-illustration_114360-4110.jpg"
            alt="About AI Powered Resume Generator"
            className="rounded-2xl shadow-lg w-full max-w-md cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.3)" }}
            transition={{ type: "spring", stiffness: 150 }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default About;
