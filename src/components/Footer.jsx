import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowUp,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function FloatingBackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-xl"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <footer className="relative overflow-hidden border-t border-border rounded-tl-lg rounded-tr-lg bg-linear-to-t from-blue-500/90 via-neutral-200 to-bg-alt pt-10 pb-2">

        {/* Glow */}
        <div className="absolute -top-20 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          {/* Top */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >

            {/* Left */}
            <div>

              <h2 className="text-3xl font-bold">
                Vadivel
                <span className="text-primary">.S</span>
              </h2>

              <p className="mt-4 max-w-md leading-7 text-secondary">
                Passionate Full Stack MERN Developer focused on building
                modern, responsive and scalable web applications with
                clean code and great user experiences.
              </p>

            </div>

            {/* Right */}
            {/* <div className="md:text-right">

              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Let's Connect
              </h3>

              <p className="mt-4 text-secondary leading-7">
                Have an idea or opportunity?
                I'd love to hear from you.
              </p>

              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollContact}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-medium text-white shadow-lg"
              >
                Say Hello

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

            </div> */}

          </motion.div>

          {/* Back To Top */}
          <div className="my-14 flex justify-center">

            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollTop}
              className="group inline-flex items-center gap-3 rounded-full border border-border bg-white px-6 py-3 font-medium text-primary shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-xl"
            >

              <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />

              Back to Top

            </motion.button>

          </div>

          {/* Divider */}

          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Bottom */}

          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">

            <p className="text-sm text-black font-bold ">
              © {new Date().getFullYear()} Vadivel. All Rights Reserved.
            </p>

            <p className="flex items-center gap-2 text-sm text-black font-light">

              Made with

              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
              >
                <FiHeart className="text-red-500" />
              </motion.span>

              using React & Tailwind CSS

            </p>

          </div>

        </div>

      </footer>

      {/* <FloatingBackToTop /> */}
    </>
  );
}