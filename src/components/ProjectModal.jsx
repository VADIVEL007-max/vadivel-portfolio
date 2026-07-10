// import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiCheckCircle,
  FiServer,
  FiDatabase,
  FiLayers,
  FiCpu,
  FiHeart,
} from "react-icons/fi";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", duration: 0.5, bounce: 0.15 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const ProjectModal = ({ isOpen, onClose, project, previewImg }) => {
  // Listen for ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Blur Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-3xl bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-2xl z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                  Detailed Case Study
                </span>
                <span className="text-xs text-slate-400 font-mono">v1.0</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200 focus:outline-none"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-8 custom-scrollbar">
              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {project.name}
                </h3>
                <p className="text-slate-500 mt-2 text-sm md:text-base leading-relaxed">
                  Architected with high performance, secure data isolation, and smooth user interactions in mind.
                </p>
              </div>

              {/* Application Preview */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-inner group">
                <img
                  src={previewImg}
                  alt="Application Detailed Preview"
                  className="w-full h-auto object-cover max-h-72"
                />
              </div>

              {/* Technologies Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <FiCpu className="w-4 h-4 text-blue-500" /> Technical Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-slate-100 border border-slate-200/60 text-slate-700 text-xs font-medium rounded-lg hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <FiLayers className="w-4 h-4 text-purple-500" /> Key Features & Capabilities
                </h4>
                <ul className="grid grid-cols-1 gap-3">
                  {project.description.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-sm leading-relaxed"
                    >
                      <FiCheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Solutions */}
              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/80">
                <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <FiServer className="w-4 h-4 text-blue-600" /> Key Engineering Challenges Overcome
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Designing a resilient RESTful architecture with <strong>Prisma ORM</strong> and <strong>PostgreSQL</strong> required careful relational indexing for fast product searches and dynamic category filtering. Implemented strict state persistence and JWT route verification for robust end-to-end security.
                </p>
              </div>

              {/* Deployment Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div className="flex items-center gap-3">
                  <FiDatabase className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Deployment Architecture</p>
                    <p className="text-xs text-slate-500">Frontend on Vercel Edge • Backend on Render Cloud</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600">Production Ready</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-slate-50/90 backdrop-blur-md border-t border-slate-100">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                Built with <FiHeart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> using MERN Stack
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={project.githubUrl || "https://github.com/VADIVEL007-max"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  <FiGithub className="w-4 h-4" />
                  Source Code
                </a>
                <a
                  href={project.liveUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                >
                  <FiExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;