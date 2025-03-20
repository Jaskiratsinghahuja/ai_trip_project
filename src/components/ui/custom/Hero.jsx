import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

function Hero() {
  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden relative">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="flex flex-col items-center text-center px-4 relative z-10">
        {/* Animated Heading */}
        <motion.h1
          className="font-extrabold text-[50px] max-w-3xl mt-2 leading-tight text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
        >
          <span className="text-yellow-400">Discover your next adventure with your AI 🧑‍💻:</span>
        </motion.h1>

        {/* Animated Subheading */}
        <motion.h2
          className="text-[#A0522D] text-5xl font-extrabold mt-2"
          initial="hidden"
          animate="visible"
          variants={fadeInRight}
        >
          Personalized itineraries at your fingertips 🤞
        </motion.h2>

        {/* Animated Paragraph */}
        <motion.p
          className="mt-8 text-2xl text-white max-w-xl mb-12 font-bold"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget 🗺️.
        </motion.p>

        {/* Animated Button */}
        <Link to="/create-trip">
          <motion.button
            className="bg-yellow-400 text-black px-8 py-3 text-lg rounded-md hover:bg-yellow-500 transition-all shadow-lg"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 2 }}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Get Started It's Free
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;