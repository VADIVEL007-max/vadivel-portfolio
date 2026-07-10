import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
// import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { RESUME_DATA } from '../data/resume';

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

  /**
   * FIXED WIDTH FOR THE ANIMATED TITLE — desktop only, unchanged mechanism
   *
   * This is still needed on desktop: the container is sized to the
   * *longest* possible title (not the currently active one) so its width
   * never changes as titles cycle. It's no longer relevant on mobile at
   * all, since mobile now renders a single static string with nothing to
   * measure against — see the mobile/desktop split below.
   */
  const longestJobTitle = useMemo(
    () =>
      RESUME_DATA.jobTitles.reduce(
        (longest, title) => (title.length > longest.length ? title : longest),
        ''
      ),
    []
  );

  /**
   * TEXT SWITCHER — desktop only, unchanged mechanism
   * Simple index cycling on a fixed interval. This state and effect still
   * run regardless of viewport size, but its output is only ever rendered
   * inside the `hidden md:inline-flex` desktop block below — on mobile,
   * this interval keeps ticking in the background but nothing on screen
   * reflects it, since the mobile heading is static.
   */
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % RESUME_DATA.jobTitles.length);
    }, 2500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section 
      id="hero" 
      /**
       * Viewport height stability — unchanged from previous fix.
       * `min-h-screen` (100vh) is the fallback; `min-h-[100dvh]` layered on
       * top tracks the real mobile viewport as browser chrome shows/hides.
       */
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center pt-24 pb-12 px-6 sm:px-8 md:px-12 xl:px-24 bg-white overflow-hidden bg-linear-to-b from-blue-400 via-neutral-300 to-bg-alt "
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
            Welcome
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

            {/**
             * MOBILE — static title, below `md` (Tailwind's 768px breakpoint)
             *
             * No animation, no TypeAnimation, no AnimatePresence, no
             * measured width, no reserved min-height — none of that
             * machinery is needed here, because this text never changes.
             * A static string can't cause layout shift; there's nothing
             * to reserve space *for*. This is real, plain text (not
             * `aria-hidden`), so it's naturally accessible to screen
             * readers with zero extra work — no sr-only fallback needed
             * on this branch, unlike the animated desktop branch below.
             *
             * No explicit font-size class: this inherits the h1's own
             * responsive size (text-4xl below sm, text-5xl from sm up to
             * md) exactly like the line above it, so the two lines always
             * match in scale throughout the whole mobile range.
             *
             * `md:hidden` removes this from both the visual layout *and*
             * the accessibility tree at md and up (display: none hides
             * descendants from assistive tech too), so desktop users and
             * screen readers never see or hear this string — only the
             * animated version below, which is exactly the previous
             * desktop behavior.
             */}
            <span className="md:hidden text-secondary dark:text-gray-400 font-semibold leading-tight">
              MERN Stack Developer
            </span>

            {/**
             * DESKTOP — animated cycling title, md and up, mechanism
             * unchanged from before. Wrapped in `hidden md:inline-flex` so
             * it only exists visually (and in the accessibility tree) at
             * md and up — the mirror image of the mobile block above.
             *
             * Because this branch is now guaranteed to never render below
             * md, its sizing no longer needs any `sm:`/base mobile variants
             * — it can just be the single desktop value directly (text-7xl,
             * matching the h1's own md:text-7xl), which simplifies this
             * considerably compared to the previous version that had to
             * serve both mobile and desktop from one element.
             */}
            <span className="hidden md:inline-flex md:items-center md:justify-center">
              {/**
               * ACCESSIBILITY — screen-reader-only static text.
               * A title swapping every 2.5s would otherwise fire repeated
               * announcements. Since a display:none parent removes its
               * children from the accessibility tree too, this fallback
               * (like the animated text itself) is automatically only
               * exposed to screen readers at md and up — mobile users get
               * the real static heading above instead, with no overlap.
               */}
              <span className="sr-only">
                {RESUME_DATA.jobTitles.join(', ')}
              </span>

              {/**
               * ANIMATED TITLE CONTAINER — fixed width + fixed height
               * - `width` is inline style since it depends on runtime data
               *   (`longestJobTitle`) Tailwind can't see at build time. `ch`
               *   is relative to this element's own font-size.
               * - `h-[1.2em]` is a single fixed line height — safe now that
               *   this element only ever renders at md+, where the title
               *   is always shown on one line.
               * - `overflow-hidden` is a safety net against any edge case.
               */}
              <span
                aria-hidden="true"
                className="relative inline-block overflow-hidden text-secondary dark:text-gray-400 font-semibold leading-tight align-top text-7xl whitespace-nowrap h-[1.2em]"
                style={{
                  width: `${longestJobTitle.length + 3}ch`,
                }}
              >
                {/**
                 * CROSSFADE — AnimatePresence + absolute positioning,
                 * unchanged mechanism. Outgoing/incoming titles overlap in
                 * the same space inside the fixed-size box above, so the
                 * transition itself can never cause even a transient
                 * height change.
                 */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                  >
                    {RESUME_DATA.jobTitles[activeIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
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
              offset={-80}
              className="w-full sm:w-auto cursor-pointer px-8 py-3.5 text-base  border-white font-bold rounded-full bg-primary text-white hover:bg-accent hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out flex items-center justify-center"
            >
              View Projects
            </Link>

            {/* Secondary Button */}
           <Link
              to="contact"
              smooth={true}
              duration={800}
              offset={-80}
              className="w-full sm:w-auto cursor-pointer px-8 py-3.5 text-base font-bold rounded-full bg-white border border-primary/20 text-primary hover:border-blue-500 hover:text-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out flex items-center justify-center"
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