import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBookOpen,
  FiAward,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiClock,
  FiX,
  FiEye,
} from "react-icons/fi";

import { RESUME_DATA } from "../data/resume";

const icons = [FiBookOpen, FiAward, FiCheckCircle];

const defaultHighlights = [
  "Strong Academic Foundation",
  "Computer Science Fundamentals",
  "Programming & Problem Solving",
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ------------------------------- Education card ------------------------------- */

const EducationCard = ({ item, index }) => {
  const Icon = icons[index % icons.length];
  const highlights = item.highlights || defaultHighlights;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative cursor-pointer rounded-[28px] border border-gray-200 bg-white p-8 shadow-[0_2px_20px_rgba(15,23,42,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.25)]"
    >
      {/* Soft glow on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-blue-500/0 via-violet-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04] group-hover:from-blue-500 group-hover:via-violet-500 group-hover:to-indigo-500" />

      {/* Icon */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-indigo-500/20 transition-transform duration-500 group-hover:rotate-6">
        <Icon className="text-3xl text-white" />
      </div>

      {/* Level */}
      <h3 className="mt-6 text-2xl font-bold tracking-tight text-primary">
        {item.level}
      </h3>

      {/* Degree */}
      <p className="mt-2 text-secondary leading-7">{item.degree}</p>

      {/* Institution */}
      <div className="mt-6 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <FiMapPin className="text-blue-600" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Institution
          </p>
          <h4 className="font-semibold leading-6 text-primary">
            {item.institution}
          </h4>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-7 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
          <FiCalendar className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">
            {item.period}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2">
          <FiAward className="text-violet-600" />
          <span className="text-sm font-semibold text-violet-600">
            {item.score}
          </span>
        </div>
      </div>

      {/* Divider */}
      {/* <div className="my-7 h-px bg-gray-100" /> */}

      {/* Highlights */}
      {/* <ul className="space-y-3">
        {highlights.map((point) => (
          <li key={point} className="flex items-center gap-3">
            <FiCheckCircle className="shrink-0 text-blue-600" />
            <span className="text-sm text-secondary">{point}</span>
          </li>
        ))}
      </ul> */}
    </motion.div>
  );
};

/* ----------------------------- Certification card ----------------------------- */
/* Shape: { title, issuer, duration, date, summary } */

const CertificationCard = ({ item, index, onView }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative cursor-pointer rounded-[28px] border border-gray-200 bg-white p-8 shadow-[0_2px_20px_rgba(15,23,42,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.25)]"
    >
      {/* Soft glow on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-blue-500/0 via-violet-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04] group-hover:from-blue-500 group-hover:via-violet-500 group-hover:to-indigo-500" />

      {/* Icon */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-indigo-500/20 transition-transform duration-500 group-hover:rotate-6">
        <FiAward className="text-3xl text-white" />
      </div>

      {/* Title */}
      <h3 className="mt-6 text-2xl font-bold tracking-tight text-primary">
        {item.title}
      </h3>

      {/* Issuer */}
      <div className="mt-6 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <FiMapPin className="text-blue-600" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Issued By
          </p>
          <h4 className="font-semibold leading-6 text-primary">
            {item.issuer}
          </h4>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-7 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
          <FiClock className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">
            {item.duration}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2">
          <FiCalendar className="text-violet-600" />
          <span className="text-sm font-semibold text-violet-600">
            {item.date}
          </span>
        </div>
      </div>

      {/* Divider */}
      {/* <div className="my-7 h-px bg-gray-100" /> */}

      {/* Summary */}
      {/* <p className="line-clamp-3 text-sm leading-7 text-secondary"> */}
        {/* {item.summary} */}
      {/* </p> */}

      {/* View certificate button */}
      <button
        type="button"
        onClick={() => onView(item)}
        className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        <FiEye className="text-base" />
        View Certificate
      </button>
    </motion.div>
  );
};

/* ------------------------------ Certificate modal ------------------------------ */

const CertificateModal = ({ item, onClose }) => {
  // lock background scroll while modal is open
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[28px] border border-gray-200 bg-white p-8 shadow-2xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors duration-300 hover:bg-gray-200 hover:text-primary"
        >
          <FiX className="text-lg" />
        </button>

        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-indigo-500/20">
          <FiAward className="text-3xl text-white" />
        </div>

        {/* Title */}
        <h3 className="mt-6 pr-8 text-2xl font-bold tracking-tight text-primary">
          {item.title}
        </h3>

        {/* Issuer */}
        <div className="mt-6 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <FiMapPin className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Issued By
            </p>
            <h4 className="font-semibold leading-6 text-primary">
              {item.issuer}
            </h4>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-7 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
            <FiClock className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">
              {item.duration}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2">
            <FiCalendar className="text-violet-600" />
            <span className="text-sm font-semibold text-violet-600">
              {item.date}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-gray-100" />

        {/* Full summary */}
        <p className="text-sm leading-7 text-secondary">{item.summary}</p>
      </motion.div>
    </motion.div>
  );
};

/* ----------------------------------- Section ----------------------------------- */

const Education = () => {
  const certifications = RESUME_DATA.certifications || [];
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="education" className="bg-white px-6 py-24 md:px-12 xl:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-5 inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
            My Academic Journey
          </span>

          <h2 className="text-4xl font-bold text-primary md:text-5xl">
            Education{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              & Certifications
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-secondary">
            My educational journey that built a strong foundation in
            Computer Science and modern web development.
          </p>
        </motion.div>

        {/* Education cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {RESUME_DATA.education.map((item, index) => (
            <EducationCard key={item.level} item={item} index={index} />
          ))}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mt-20">
            {/* <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center text-2xl font-bold text-primary md:text-3xl"
            >
              Certifications
            </motion.h3> */}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {certifications.map((item, index) => (
                <CertificationCard
                  key={item.title}
                  item={item}
                  index={index}
                  onView={setSelectedCert}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certificate popup */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            item={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Education;