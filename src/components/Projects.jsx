// import React, { useState } from "react";
import { motion } from "framer-motion";
import { RESUME_DATA } from "../data/resume";
import {
  FiExternalLink,
  FiGithub,
  FiCheckCircle,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";
import ProjectModal from "./ProjectModal";

// Placeholder dummy image import as requested
import projectPreview from "../assets/project-preview.png";
import { useState } from "react";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="projects"
      className="py-12 md:py-16 px-6 md:px-12 xl:px-24 bg-slate-50/50 min-h-fit flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-300 rounded-full text-blue-600 text-xs font-semibold mb-3">
            <FiLayers className="w-3.5 h-3.5" /> Selected Portfolio Work
          </div> */}
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Featured {" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-600 p-4 text-sm md:text-base max-w-xl mx-auto mt-2">
            Architected and deployed end-to-end full stack web applications.
          </p>
        </motion.div>

        {/* Project List */}
        <div className="flex flex-col gap-8">
          {RESUME_DATA.projects.map((project, index) => {
            // Pick first 3 points for compact presentation
            const highlights = project.description.slice(0, 2);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="project-card-glow group bg-white rounded-[32px] border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row items-stretch">
                  {/* Left Side: Mockup Preview (45% Desktop) */}
                  <div className="lg:w-[45%] bg-gray-50 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group/image">
                    {/* Background Gradient Glowing Blobs */}
                    <div className="absolute -top-16 -left-3 w-48 h-48 bg-black rounded-full blur-3xl group-hover/image:scale-125 transition-transform duration-700" />
                    <div className="absolute -bottom-16 -right-1 w-48 h-48 bg-black rounded-full blur-3xl group-hover/image:scale-125 transition-transform duration-700" />

                    {/* App Preview Image Card */}
                    <div className="relative z-10 my-auto py-2">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover/image:scale-[1.03] group-hover/image:-rotate-1 transition-all duration-500">
                        {/* Browser Bar Decoration */}
                        {/* <div className="h-6 bg-slate-900/90 backdrop-blur px-3 flex items-center gap-1.5 border-b border-white/10">
                          <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                        </div> */}
                        <div className="aspect-[16/9] w-full overflow-hidden">
                          <img
                            src={projectPreview}
                            alt={`${project.name} Preview`}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="relative z-10 grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
                      <a
                        href={RESUME_DATA.smartbuy}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all duration-200"
                      >
                        <span>Live Demo</span>
                        <FiExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={RESUME_DATA.smartbuyGithub}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black hover:bg-white/2 text-white border border-white/15 text-xs font-semibold rounded-xl backdrop-blur-md hover:scale-[1.02] transition-all duration-200"
                      >
                        <span>Source</span>
                        <FiGithub className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Side: Details & Highlights (55% Desktop) */}
                  <div className="lg:w-[55%] p-6 md:p-8 flex flex-col justify-between bg-white relative z-10">
                    <div>
                      {/* Top Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-bold">
                          <FiStar className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Featured Project
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Full Stack Architecture
                        </span>
                      </div>

                      {/* Project Name */}
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-4">
                        {project.name}
                      </h3>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tech.map((techItem, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-slate-700 hover:text-blue-600 rounded-lg text-xs font-semibold hover:-translate-y-0.5 transition-all duration-200"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>

                      {/* Short Bullet Highlights */}
                      <ul className="space-y-2.5 mb-6">
                        {highlights.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-start gap-2.5"
                          >
                            <FiCheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span className="text-xs md:text-sm text-slate-600 leading-relaxed line-clamp-2">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Read More Modal Trigger */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-blue-600 hover:text-blue-700 group/btn transition-colors duration-200"
                      >
                        <span>Read Case Study</span>
                        <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </button>

                      <span className="text-xs text-slate-400 font-medium">
                        Complete breakdown inside
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Render Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
          previewImg={projectPreview}
        />
      )}
    </section>
  );
};

export default Projects;