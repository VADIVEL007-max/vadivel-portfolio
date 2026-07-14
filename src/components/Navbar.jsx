import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import vadivelresume from "../assets/Vadivel-Resume.pdf";

const NAVBAR_HEIGHT = 80;

const navLinks = [
  { name: "Home", to: "hero" },
  { name: "About", to: "about" },
  { name: "Education", to: "education" },
  { name: "Skills", to: "skills" },
  { name: "Projects", to: "projects" },
  { name: "Contact", to: "contact" },
];

// Motion Animation Configurations
const dropdownVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.99,
    transition: { duration: 0.18, ease: "easeInOut" },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.25 },
  },
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-colors transition-shadow duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full h-full max-w-7xl mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="hero"
          smooth
          duration={800}
          offset={-NAVBAR_HEIGHT}
          className="text-xl font-bold tracking-tight text-primary cursor-pointer hover:text-accent transition-colors shrink-0"
        >
          Portfolio
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth
              duration={800}
              offset={-NAVBAR_HEIGHT}
              spy
              activeClass="text-accent font-semibold"
              className="text-sm  text-black  font-extrabold cursor-pointer hover:text-accent hover:scale-125 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <a
            href={vadivelresume}
            download="Vadivel_S_Resume.pdf"
            className="px-6 py-2.5 text-sm font-medium bg-primary text-white rounded-full hover:bg-accent hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button Wrapper */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          className="md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-primary hover:bg-gray-100/80 transition-colors duration-300 focus:outline-none relative"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileMenuOpen ? (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <HiXMark className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="burger-icon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <HiBars3 className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Premium Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 right-0 px-4 sm:px-6 md:hidden pointer-events-none">
            <motion.div
              id="mobile-menu"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] shadow-2xl pointer-events-auto overflow-hidden z-40"
            >
              <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto px-6 py-7 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <Link
                      to={link.to}
                      smooth
                      duration={800}
                      offset={-NAVBAR_HEIGHT}
                      spy
                      activeClass="text-blue-600 font-bold bg-slate-50/80"
                      className="block text-base font-semibold text-slate-700 cursor-pointer px-4 py-3 rounded-2xl hover:text-slate-900 hover:bg-slate-50/60 transition-all duration-200"
                      onClick={closeMobileMenu}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Separated Staggered Action Button */}
                <motion.div variants={buttonVariants} className="pt-2">
                  <a
                    href={vadivelresume}
                    download="Vadivel_S_Resume.pdf"
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-center py-3.5 text-sm font-bold bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors duration-200 shadow-sm"
                  >
                    Resume
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;