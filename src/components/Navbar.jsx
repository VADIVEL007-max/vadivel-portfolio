import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import vadivelresume from "../assets/Vadivel-Resume.pdf";

const NAVBAR_HEIGHT = 80; // px — matches h-20 below, used as scroll offset

const navLinks = [
  { name: "Home", to: "hero" },
  { name: "About", to: "about" },
  { name: "Education", to: "education" },
  { name: "Skills", to: "skills" },
  { name: "Projects", to: "projects" },
  { name: "Contact", to: "contact" },
];

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

  // Lock background scroll smoothly without causing horizontal layout shifts
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
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
              className="text-sm font-medium text-secondary cursor-pointer hover:text-primary transition-colors"
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          className="md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-primary hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
        >
          <motion.div
            className="w-6 h-6 flex items-center justify-center"
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {isMobileMenuOpen ? (
              <HiXMark className="w-6 h-6 shrink-0" />
            ) : (
              <HiBars3 className="w-6 h-6 shrink-0" />
            )}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-20 left-0 right-0 md:hidden bg-white border-b border-border shadow-xl z-40"
          >
            <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto px-6 py-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth
                  duration={800}
                  offset={-NAVBAR_HEIGHT}
                  spy
                  activeClass="text-accent font-semibold"
                  className="text-base font-medium text-secondary cursor-pointer hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}

              <a
                href={vadivelresume}
                download="Vadivel_S_Resume.pdf"
                onClick={closeMobileMenu}
                className="mt-2 self-center px-6 py-2.5 text-sm font-medium bg-primary text-white rounded-full hover:bg-accent hover:shadow-lg transition-all duration-300"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;