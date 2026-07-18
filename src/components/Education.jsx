import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap,
  School,
  Trophy,
  MapPin,
  CalendarDays,
  Percent,
  Clock,
  CalendarCheck,
  Eye,
  ArrowRight,
  X,
} from "lucide-react";

import { RESUME_DATA } from "../data/resume";

/* --------------------------------- Motion variants --------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const timelineItem = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ------------------------------- Icon tone config ----------------------------------- */

const TONES = {
  education: {
    Icon: GraduationCap,
    bg: "bg-blue-50",
    text: "text-blue-600",
    ring: "ring-blue-100",
    glow: "shadow-blue-500/25",
    pulse: "bg-blue-400",
  },
  school: {
    Icon: School,
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    ring: "ring-indigo-100",
    glow: "shadow-indigo-500/25",
    pulse: "bg-indigo-400",
  },
  certification: {
    Icon: Trophy,
    bg: "bg-violet-50",
    text: "text-violet-600",
    ring: "ring-violet-100",
    glow: "shadow-violet-500/25",
    pulse: "bg-violet-400",
  },
};

/* ------------------------------------- Badge -------------------------------------- */

const Badge = ({ icon: Icon, children, tone = "blue" }) => {
  const tones = {
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold leading-tight sm:text-sm ${tones[tone]}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
      {children}
    </span>
  );
};

/* ------------------------------------ Dot ------------------------------------------ */

const TimelineDot = ({ tone }) => {
  const { Icon, bg, text, ring, glow, pulse } = tone;

  return (
    <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center">
      {/* Pulse ring, plays briefly as the dot enters view */}
      <motion.span
        initial={{ scale: 0.7, opacity: 0.45 }}
        whileInView={{ scale: [0.7, 1.6], opacity: [0.45, 0] }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, repeat: 1, repeatDelay: 0.2, ease: "easeOut" }}
        className={`absolute inset-0 rounded-full ${pulse}`}
      />

      {/* Soft outer glow, brightens on card hover */}
      <span
        className={`absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60 ${pulse}`}
      />

      {/* Inner dot: light colored background, white ring, colored icon */}
      <span
        className={`relative flex h-10 w-10 items-center justify-center rounded-full ${bg} ring-4 ring-white shadow-md ${glow} transition-transform duration-500 group-hover:scale-105`}
      >
        <span className={`absolute inset-0 rounded-full ring-1 ${ring}`} />
        <Icon className={`h-4.5 w-4.5 ${text}`} aria-hidden="true" />
      </span>
    </span>
  );
};

/* ---------------------------------- Timeline card ----------------------------------- */

const TimelineCard = ({ data }) => (
  <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_2px_20px_rgba(15,23,42,0.06)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-blue-200 group-hover:shadow-[0_24px_50px_-18px_rgba(79,70,229,0.3)] sm:p-7">
    {/* Decorative corner blob */}
    <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-blue-400/0 to-violet-500/0 blur-2xl transition-all duration-500 group-hover:from-blue-400/15 group-hover:to-violet-500/15" />

    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
      {data.eyebrow}
    </p>

    <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight text-primary sm:text-2xl">
      {data.title}
    </h3>

    <p className="mt-1.5 leading-6 text-secondary sm:leading-7">
      {data.subtitle}
    </p>

    <div className="mt-4 flex items-start gap-2 text-sm leading-snug text-secondary sm:mt-5">
      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
      <span>{data.source}</span>
    </div>

    <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
      <Badge icon={data.badgeOneIcon} tone="blue">
        {data.badgeOneLabel}
      </Badge>
      <Badge icon={data.badgeTwoIcon} tone="violet">
        {data.badgeTwoLabel}
      </Badge>
    </div>

    {data.type === "certification" && (
      <button
        type="button"
        onClick={data.onView}
        aria-label={`View certificate for ${data.title}`}
        className="group/btn relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        <Eye className="h-4 w-4" aria-hidden="true" />
        View Certificate
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          aria-hidden="true"
        />
      </button>
    )}
  </div>
);

/* --------------------------------- Timeline item ----------------------------------- */

const TimelineItem = ({ data, index }) => {
  const tone = TONES[data.type] || TONES.education;

  return (
    <motion.li
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={timelineItem}
      className="group relative list-none pl-16"
    >
      <TimelineDot tone={tone} />

      <div className="mb-8 sm:mb-10">
        <TimelineCard data={data} />
      </div>
    </motion.li>
  );
};

/* ------------------------------- Certificate modal ---------------------------------- */

const CertificateModal = ({ item, onClose }) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate details"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors duration-300 hover:bg-gray-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <X className="h-4.5 w-4.5" aria-hidden="true" />
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 ring-4 ring-white shadow-md shadow-violet-500/25">
          <Trophy className="h-6 w-6 text-violet-600" aria-hidden="true" />
        </div>

        <h3
          id="certificate-modal-title"
          className="mt-6 pr-8 text-2xl font-bold tracking-tight text-primary"
        >
          {item.title}
        </h3>

        <div className="mt-6 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <MapPin className="h-4.5 w-4.5 text-blue-600" aria-hidden="true" />
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

        <div className="mt-7 flex flex-wrap gap-3">
          <Badge icon={Clock} tone="blue">
            {item.duration}
          </Badge>
          <Badge icon={CalendarCheck} tone="violet">
            {item.date}
          </Badge>
        </div>

        <div className="my-7 h-px bg-gray-100" />

        <p className="text-sm leading-7 text-secondary">{item.summary}</p>
      </motion.div>
    </motion.div>
  );
};

/* -------------------------------------- Timeline ------------------------------------- */

const Timeline = ({ items }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Track — perfectly centered with the 40px dots */}
      <div className="absolute left-5 top-0 h-full w-0.5 rounded-full bg-gray-200" />

      {/* Animated gradient fill with soft glow */}
      <motion.div
        style={{ scaleY: lineScale, opacity: glowOpacity }}
        className="absolute left-5 top-0 h-full w-0.5 origin-top rounded-full bg-gradient-to-b from-blue-500 via-violet-500 to-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
      />

      <ol className="relative">
        {items.map((data, index) => (
          <TimelineItem key={data.key} data={data} index={index} />
        ))}
      </ol>
    </div>
  );
};

/* ---------------------------------------- Section --------------------------------------- */

const Education = () => {
  const education = RESUME_DATA.education || [];
  const certifications = RESUME_DATA.certifications || [];
  const [selectedCert, setSelectedCert] = useState(null);

  const timelineItems = [
    ...education.map((item) => ({
      key: `edu-${item.level}`,
      type: /school/i.test(item.level) ? "school" : "education",
      eyebrow: item.period,
      title: item.level,
      subtitle: item.degree,
      source: item.institution,
      badgeOneIcon: CalendarDays,
      badgeOneLabel: item.period,
      badgeTwoIcon: Percent,
      badgeTwoLabel: item.score,
    })),
    ...certifications.map((item) => ({
      key: `cert-${item.title}`,
      type: "certification",
      eyebrow: item.date,
      title: item.title,
      subtitle: item.issuer,
      source: item.issuer,
      badgeOneIcon: Clock,
      badgeOneLabel: item.duration,
      badgeTwoIcon: CalendarCheck,
      badgeTwoLabel: item.date,
      onView: () => setSelectedCert(item),
    })),
  ];

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="overflow-x-hidden bg-white px-6 py-24 md:px-12 xl:px-24"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16 text-center sm:mb-20"
        >
          <span className="mb-5 inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
            My Academic Journey
          </span>

          <h2
            id="education-heading"
            className="text-4xl font-bold text-primary md:text-5xl"
          >
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

        {/* Unified timeline */}
        <Timeline items={timelineItems} />
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