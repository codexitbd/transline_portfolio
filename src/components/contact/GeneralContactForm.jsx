import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbUser,
  TbBuilding,
  TbMail,
  TbPhone,
  TbChevronDown,
  TbMessage,
  TbSend,
  TbCheck,
  TbShieldCheck,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const inquiryTypes = [
  { value: "", label: "Select an option" },
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "career", label: "Career Inquiry" },
  { value: "feedback", label: "Complaint/Feedback" },
  { value: "other", label: "Other" },
];

const GeneralContactForm = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    newsletter: false,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
        newsletter: false,
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div
        ref={formRef}
        className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-lg h-full flex flex-col items-center justify-center text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <TbCheck className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
        <p className="text-gray-600 max-w-sm">
          Thank you for reaching out. Our team will get back to you within 2-4
          business hours.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={formRef}
      className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-lg"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <TbMessage className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-500 text-sm">General inquiries & support</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <TbUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-300"
            />
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <div className="relative">
            <TbBuilding className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your Company Ltd."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-300"
            />
          </div>
        </div>

        {/* Email & Phone Row */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <TbMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@company.com"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <TbPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+880 1XXX-XXXXXX"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Inquiry Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How Can We Help? <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-300 appearance-none cursor-pointer"
            >
              {inquiryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <TbChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Tell us how we can help you..."
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-300 resize-none"
          />
        </div>

        {/* Newsletter Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-orange-500 peer-checked:bg-orange-500 transition-all duration-300" />
            <TbCheck className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
            Subscribe to our newsletter for industry insights and updates
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <TbSend className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <TbShieldCheck className="w-4 h-4" />
          <span>
            Your information is safe.{" "}
            <a href="/privacy" className="text-orange-600 hover:underline">
              Privacy Policy
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default GeneralContactForm;
