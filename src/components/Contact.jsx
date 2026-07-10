// import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiX,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RESUME_DATA } from "../data/resume";
import { useState } from "react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);

      toast.success("Message sent successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 4000);
    }, 1200);
  };

  const contactItems = [
    {
      icon: <FiMail className="w-5 h-5 text-blue-600" />,
      label: "Email",
      value: RESUME_DATA.email || "vadivels759@gmail.com",
      href: `mailto:${RESUME_DATA.email || "vadivels759@gmail.com"}`,
    },
    {
      icon: <FiPhone className="w-5 h-5 text-purple-600" />,
      label: "Phone",
      value: RESUME_DATA.phone || "+91 7845686579",
      href: `tel:${(RESUME_DATA.phone || "+917845686579").replace(/\s+/g, "")}`,
    },
    {
      icon: <FiMapPin className="w-5 h-5 text-indigo-600" />,
      label: "Location",
      value: "Dindigul, Tamil Nadu, India",
      href: null,
    },
  ];


  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-6 md:px-12 xl:px-24 bg-white relative overflow-hidden text-slate-800"
    >
      <ToastContainer />

      {/* Background Gradient Blur Blobs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Let's Work{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          {/* <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mt-3 leading-relaxed font-normal">
            I'm always excited to discuss new opportunities, freelance projects, internships, and collaborations.
          </p> */}
        </motion.div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards & Socials (40% Desktop -> 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                I'm always excited to discuss new opportunities, freelance projects, internships, and collaborations.
              </p>
            </div>

            {/* Staggered Contact Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contactItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors truncate block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
              {/* Social Icons */}
<motion.div
  variants={itemVariants}
  className="mt-16 flex items-center gap-5"
>
  {/* GitHub */}
  <motion.a
    href={RESUME_DATA.github}
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.95 }}
    className="relative group flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
  >
    <FiGithub className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-accent" />

    <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      GitHub
      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-primary"></span>
    </span>
  </motion.a>

  {/* LinkedIn */}
  <motion.a
    href={RESUME_DATA.linkedin}
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.95 }}
    className="relative group flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
  >
    <FiLinkedin className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-blue-600" />

    <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      LinkedIn
      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-primary"></span>
    </span>
  </motion.a>

  {/* Email */}
  <motion.a
    href={`mailto:${RESUME_DATA.email}`}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.95 }}
    className="relative group flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
  >
    <FiMail className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-red-500" />

    <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      Email Me
      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-primary"></span>
    </span>
  </motion.a>
</motion.div>
          </motion.div>

          {/* Right Column: Premium Form (60% Desktop -> 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xl hover:border-blue-400/80 hover:shadow-2xl transition-all duration-500">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      className={`peer w-full px-4 pt-6 pb-2 rounded-2xl bg-slate-50/80 border text-sm font-semibold text-slate-900 placeholder-transparent focus:outline-none focus:bg-white transition-all duration-300 ${
                        errors.name
                          ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                          : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:shadow-sm"
                      }`}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-blue-600 pointer-events-none"
                    >
                      Your Name
                    </label>
                    {errors.name && (
                      <span className="text-[11px] text-rose-500 font-medium mt-1 block pl-1">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      className={`peer w-full px-4 pt-6 pb-2 rounded-2xl bg-slate-50/80 border text-sm font-semibold text-slate-900 placeholder-transparent focus:outline-none focus:bg-white transition-all duration-300 ${
                        errors.email
                          ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                          : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:shadow-sm"
                      }`}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-blue-600 pointer-events-none"
                    >
                      Email Address
                    </label>
                    {errors.email && (
                      <span className="text-[11px] text-rose-500 font-medium mt-1 block pl-1">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-4 pt-6 pb-2 rounded-2xl bg-slate-50/80 border text-sm font-semibold text-slate-900 placeholder-transparent focus:outline-none focus:bg-white transition-all duration-300 ${
                      errors.subject
                        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:shadow-sm"
                    }`}
                  />
                  <label
                    htmlFor="subject"
                    className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-blue-600 pointer-events-none"
                  >
                    Subject
                  </label>
                  {errors.subject && (
                    <span className="text-[11px] text-rose-500 font-medium mt-1 block pl-1">
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-4 pt-6 pb-2 rounded-2xl bg-slate-50/80 border text-sm font-semibold text-slate-900 placeholder-transparent focus:outline-none focus:bg-white transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:shadow-sm"
                    }`}
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-blue-600 pointer-events-none"
                  >
                    Your Message
                  </label>
                  {errors.message && (
                    <span className="text-[11px] text-rose-500 font-medium mt-1 block pl-1">
                      {errors.message}
                    </span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white text-base font-medium rounded-xl hover:bg-accent hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>

                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>

                      <FiSend className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Glass Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-xs bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 text-center shadow-2xl z-10"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                <FiCheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Message Sent!
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed">
                Thank you for reaching out. I'll get back to you shortly.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;