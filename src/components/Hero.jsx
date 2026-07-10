import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
// import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { RESUME_DATA } from '../data/resume';
// import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  // Animation Variants for staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  //  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % RESUME_DATA.jobTitles.length);
  //   },3000); // 5 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 md:px-12 xl:px-24 bg-white overflow-hidden bg-linear-to-b from-blue-400 via-neutral-300 to-bg-alt "
    >
      {/* Background Decorative Blur (Subtle Vercel/Linear feel) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Status Badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-alt border border-border text-sm font-medium text-secondary shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Wellcome
          </motion.div>

          {/* Main Headline */}
           <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6 leading-tight"
          >
            Hi, I'm{" "}
            <span className="bg-linear-to-r from-blue-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
              {RESUME_DATA.name.split(" ")[0]}
            </span>
            <span className="text-accent">.</span>

            <br />

            <span className="text-secondary dark:text-gray-400 font-semibold inline-block min-h-[1.2em]">
              <TypeAnimation
                sequence={RESUME_DATA.jobTitles.flatMap((role) => [role, 2000])}
                wrapper="span"
                speed={50}
                deletionSpeed={65}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </motion.h1>

          {/* Subheadline / Summary */}
         <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-secondary max-w-2xl mb-10 leading-9 tracking-wide"
          >
            I'm a{" "}
            <span className="font-semibold text-primary">
              MERN Stack Developer
            </span>{" "}
            passionate about building{" "}
            <span className="text-blue-500">modern</span>,{" "}
            <span className="text-blue-500">responsive</span>, and{" "}
            <span className="text-blue-500">scalable</span>{" "}
            web applications with{" "}
            <span className="font-medium text-primary">React</span>,{" "}
            <span className="font-medium text-primary">Node.js</span>,{" "}
            <span className="font-medium text-primary">Express.js</span>, and{" "}
            <span className="font-medium text-primary">PostgreSQL</span>, focusing on{" "}
            <span className="text-blue-500">clean code</span> and exceptional user
            experiences.
          </motion.p>
          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary Button */}
            <Link
              to="projects"
              smooth={true}
              duration={800}
              className="w-full sm:w-auto cursor-pointer px-8 py-3.5 text-base  border-white font-bold rounded-full bg-primary text-white hover:bg-accent hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out flex items-center justify-center"
            >
              View Projects
            </Link>

            {/* Secondary Button */}
           <Link
              to="contact"
              smooth={true}
              duration={800}
              className="w-full sm:w-auto cursor-pointer px-8 py-3.5 text-base font-bold rounded-full bg-white border-black border hover:border-blue-500 hover:text-blue-500 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out flex items-center justify-center bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparen"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Social Links */}
          {/* <motion.div 
            variants={itemVariants}
            className="mt-16 flex items-center gap-6 text-secondary"
          >
            <a 
              href={RESUME_DATA.github} 
              target="_blank" 
              rel="noreferrer"
              className="group relative p-3 rounded-full border border-border overflow-hidden transition-all duration-300 hover:border-blue-500"
              aria-label="GitHub"
            >
              <span className="absolute inset-0 bg-black scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></span>

              <FiGithub className="relative z-10 w-6 h-6 group-hover:text-white transition-colors duration-300" />
            </a>
            <a 
              href={RESUME_DATA.linkedin} 
              target="_blank" 
              rel="noreferrer"
             className="group relative p-3 rounded-full border border-border overflow-hidden transition-all duration-300 hover:border-blue-500"
              aria-label="LinkedIn"
            >
              <span className="absolute inset-0 bg-blue-500 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></span>

              <FiLinkedin className="relative z-10 w-6 h-6 group-hover:text-white transition-colors duration-300" />
            </a>
            <a 
              href={`mailto:${RESUME_DATA.email}`}
              className="group relative p-3 rounded-full border border-border overflow-hidden transition-all duration-300 hover:border-blue-500"
              aria-label="Email"
            >
            <span className="absolute inset-0 bg-black scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></span>

              <FiMail className="relative z-10 w-6 h-6 group-hover:text-white transition-colors duration-300" />
            </a>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
