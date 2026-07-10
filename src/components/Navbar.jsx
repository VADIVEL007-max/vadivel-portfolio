import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBars3, HiXMark } from "react-icons/hi2";
import vadivelresume from "../assets/Vadivel-Resume.pdf"; // Ensure the resume PDF is in the assets folder
// import Education from './Education';


const navLinks = [
   { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Education', to: 'education' },
   { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  // { name: 'Experience', to: 'experience' },
  { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll to apply glassmorphism and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-border py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="hero"
          smooth={true}
          duration={800}
          className="text-xl font-bold tracking-tight text-primary cursor-pointer hover:text-accent transition-colors"
        >
          Protfolio<span className="text-accent">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={800}
              spy={true}
              activeClass="text-accent font-semibold"
              className="text-sm font-medium text-secondary cursor-pointer hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <a
            href={vadivelresume}
            download="Vadivel_S_Resume.pdf"
            className="px-6 py-2.5 text-sm font-medium bg-primary text-white rounded-full hover:bg-accent hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2.5 -mr-2.5 text-primary focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <HiXMark className="w-6 h-6" />
          ) : (
            <HiBars3 className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-b border-border max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={800}
                  className="text-base font-medium text-secondary cursor-pointer hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
                <a
                  href={vadivelresume}
                  download="Vadivel_S_Resume.pdf"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-2.5 text-sm self-center font-medium bg-primary text-white rounded-full hover:bg-accent hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out"
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