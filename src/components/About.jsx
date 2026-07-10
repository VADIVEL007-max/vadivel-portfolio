import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { RESUME_DATA } from '../data/resume';
  import {profile} from '../assets/profile.jpg';

const About = () => {
  // Viewport animation configuration
  const viewportConfig = { once: true, amount: 0.3 };

  // --- Interactive image state ---
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [9, -9]), {
    stiffness: 180,
    damping: 20,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 180,
    damping: 20,
    mass: 0.6,
  });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 xl:px-24 bg-white"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

        {/* Left Column: Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-start w-full lg:w-auto"
        >
          {/* Floating wrapper — subtle idle motion, always on */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              {/* Rotating blurred gradient ring — spins always, fades in on hover */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360, opacity: isHovered ? 1 : 0 }}
                transition={{
                  rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 0.5, ease: 'easeOut' },
                }}
                className="absolute -inset-8 rounded-[44px] bg-[conic-gradient(from_0deg,rgba(59,130,246,0.35),rgba(139,92,246,0.35),rgba(59,130,246,0.35))] blur-2xl pointer-events-none"
              />

              {/* Soft blue/purple glow behind the image */}
              {/* <motion.div
                aria-hidden="true"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute -inset-3 rounded-[36px] bg-linear-to-br from-neutral-400 via-blue-300 to-transparent blur-2xl pointer-events-none"
              /> */}

              {/* Animated gradient border — appears only on hover */}
              {/* <motion.div
                aria-hidden="true"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute -inset-[2px] rounded-[33px] bg-gradient-to-br from-cyan-500 via-yellow-500 to-neutral-400 pointer-events-none"
              /> */}

              {/* Tilt container — 3D rotate + growing shadow */}
              <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                animate={{
                  boxShadow: isHovered
                    ? '0 24px 60px -12px rgba(99,102,241,0.35)'
                    : '0 8px 30px rgba(0,0,0,0.08)',
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[260px] h-[320px] sm:w-[300px] sm:h-[360px] rounded-[32px] overflow-hidden border border-border dark:border-neutral-800 bg-bg-alt dark:bg-neutral-950"
              >
                <motion.img
                  src={profile}
                  alt={RESUME_DATA.name}
                  animate={{ scale: isHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover"
                />

                {/* Glossy shine sweep */}
                <motion.div
                  aria-hidden="true"
                  animate={{ x: isHovered ? '120%' : '-120%' }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
            <div className="h-px bg-border dark:bg-neutral-800 flex-1 ml-4 hidden sm:block"></div>
          </div>

        <p className="text-lg leading-relaxed text-secondary mb-8">
  Hi, I'm{" "}
  <span className="font-semibold text-primary">
    Vadivel
  </span>{" "}
  from{" "}
  <span className="font-semibold text-primary">
    Dindigul, Tamil Nadu
  </span>
  . I'm a passionate{" "}
  <span className="font-semibold text-accent">
    Full Stack MERN Developer
  </span>{" "}
  who enjoys turning ideas into modern, responsive, and scalable web applications.
  I work with{" "}
  <span className="font-semibold text-primary">
    React.js
  </span>
  ,{" "}
  <span className="font-semibold text-primary">
    Node.js
  </span>
  ,{" "}
  <span className="font-semibold text-primary">
    Express.js
  </span>
  ,{" "}
  <span className="font-semibold text-primary">
    PostgreSQL
  </span>
  , and{" "}
  <span className="font-semibold text-primary">
    Prisma ORM
  </span>
  {" "}to build complete full-stack solutions. I'm passionate about writing{" "}
  <span className="font-medium text-accent">
    clean, maintainable code
  </span>
  , solving{" "}
  <span className="font-medium text-accent">
    real-world problems
  </span>
  , and continuously learning new technologies to become a better developer.
          </p>

          {/* <div className="flex flex-col gap-2">
            <span className="font-semibold text-primary dark:text-gray-100">Soft Skills:</span>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-bg-alt dark:bg-neutral-950 border border-border dark:border-neutral-800 rounded-full text-sm font-medium text-secondary dark:text-gray-400 hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div> */}
        </motion.div>

      </div>
    </section>
  );
};

export default About;