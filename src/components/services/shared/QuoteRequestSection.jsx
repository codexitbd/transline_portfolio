import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbSend,
  TbUser,
  TbMail,
  TbPhone,
  TbBuildingSkyscraper,
  TbPackage,
  TbMapPin,
  TbMessage,
  TbCheck,
  TbLoader,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const QuoteRequestSection = ({
  title = "Get a Competitive Freight Quote Today",
  subtitle = "Fill out the form below and our team will get back to you within 24 hours with a customized quote.",
  serviceName = "International Freight Forwarding",
}) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const decorRef = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    cargoType: "",
    origin: "",
    destination: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cargoTypes = [
    "General Cargo",
    "Perishables",
    "Dangerous Goods",
    "Heavy Machinery",
    "Electronics",
    "Textiles/Garments",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        cargoType: "",
        origin: "",
        destination: "",
        message: "",
      });
    }, 3000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Decorative elements
      decorRef.current.forEach((decor, index) => {
        if (!decor) return;
        gsap.to(decor, {
          y: "random(-20, 20)",
          x: "random(-15, 15)",
          rotation: "random(-10, 10)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-900 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={(el) => (decorRef.current[0] = el)}
          className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"
        />
        <div
          ref={(el) => (decorRef.current[1] = el)}
          className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"
        />
        <div
          ref={(el) => (decorRef.current[2] = el)}
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full mb-4">
            <TbSend className="w-4 h-4" />
            Request a Quote
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{subtitle}</p>
        </div>

        {/* Form */}
        <div
          ref={formRef}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TbCheck className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Quote Request Submitted!
              </h3>
              <p className="text-gray-600">
                Thank you for your inquiry. Our team will contact you within 24
                hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Service Type Badge */}
              <div className="mb-8 pb-6 border-b border-gray-100">
                <span className="text-sm text-gray-500">Service Requested:</span>
                <span className="ml-2 px-3 py-1 bg-orange-50 text-orange-600 text-sm font-medium rounded-full">
                  {serviceName}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <TbUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <TbMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <TbPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <TbBuildingSkyscraper className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>

                {/* Cargo Type */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo Type *
                  </label>
                  <div className="relative">
                    <TbPackage className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="cargoType"
                      value={formData.cargoType}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none appearance-none bg-white"
                    >
                      <option value="">Select cargo type</option>
                      {cargoTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Origin */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origin *
                  </label>
                  <div className="relative">
                    <TbMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div className="relative md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination *
                  </label>
                  <div className="relative">
                    <TbMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="relative md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <div className="relative">
                    <TbMessage className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
                      placeholder="Tell us about your cargo dimensions, weight, special requirements..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <TbLoader className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <TbSend className="w-5 h-5" />
                      Get Your Free Quote
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteRequestSection;
