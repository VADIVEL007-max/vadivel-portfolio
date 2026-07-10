import React from "react";
import { motion } from "framer-motion";

// Category Icons
import { FiLayout, FiServer, FiDatabase, FiTool } from "react-icons/fi";

// Tech Brand Icons
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaKey,
  FaLayerGroup,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiMongodb,
  SiPostman,
  SiVercel,
  SiRender,
  SiJsonwebtokens,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";

// Skill Data Structure with Official Brand Colors
const skillCategories = [
  {
    title: "Frontend",
    icon: <FiLayout className="w-6 h-6 text-blue-500" />,
    items: [
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "React Router", icon: FaReact, color: "#CA4245" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    icon: <FiServer className="w-6 h-6 text-blue-500" />,
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "REST APIs", icon: TbApi, color: "#0055FF" },
      { name: "JWT Auth", icon: SiJsonwebtokens, color: "#000000" },
      { name: "MVC Architecture", icon: FaLayerGroup, color: "#6366F1" },
    ],
  },
  {
    title: "Database",
    icon: <FiDatabase className="w-6 h-6 text-blue-500" />,
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Prisma ORM", icon: SiPrisma, color: "#2D3748" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    title: "Tools & Deployment",
    icon: <FiTool className="w-6 h-6 text-blue-500" />,
    items: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#181717" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Vercel", icon: SiVercel, color: "#000000" },
      { name: "Render", icon: SiRender, color: "#46E3B7" },
    ],
  },
];

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const skillItemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 xl:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            What I{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
               Work With
            </span>
          </h2>
          <p className="mt-4 text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Technologies I use to build modern, scalable, and high-performance web applications from frontend to backend.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="animated-border-card group flex flex-col justify-between p-7 md:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 group-hover:scale-105 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {category.title}
                    </h3>
                    <div className="h-0.5 w-10 bg-gradient-to-r from-blue-500 to-purple-500 mt-1 rounded-full group-hover:w-16 transition-all duration-300" />
                  </div>
                </div>

                {/* Skill Mini Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.items.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={i}
                        variants={skillItemVariants}
                        className="group/item flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2.5 hover:bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
                      >
                        <Icon
                          className="text-xl flex-shrink-0 group-hover/item:scale-110 group-hover/item:rotate-6 transition-transform duration-300"
                          style={{ color: skill.color }}
                        />
                        <span className="text-xs md:text-sm font-semibold text-slate-700 truncate">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;