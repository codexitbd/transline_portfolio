import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbPackage,
  TbPlane,
  TbShip,
  TbTruck,
  TbMapPin,
  TbCalendar,
  TbScale,
  TbRuler,
  TbUser,
  TbBuilding,
  TbMail,
  TbPhone,
  TbChevronDown,
  TbFileText,
  TbCheck,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const transportModes = [
  { value: "", label: "Select transport mode" },
  { value: "air", label: "Air Freight" },
  { value: "ocean-fcl", label: "Ocean Freight (FCL)" },
  { value: "ocean-lcl", label: "Ocean Freight (LCL)" },
  { value: "multimodal", label: "Multimodal" },
  { value: "advice", label: "Not Sure - Need Advice" },
];

const additionalServices = [
  { id: "customs", label: "Customs Clearance Required" },
  { id: "warehouse", label: "Warehousing Needed" },
  { id: "insurance", label: "Insurance Required" },
  { id: "door-to-door", label: "Door-to-Door Delivery" },
  { id: "packing", label: "Packing Services" },
];

const QuoteRequestForm = () => {
  const formRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    shipmentType: "",
    transportMode: "",
    origin: "",
    destination: "",
    commodity: "",
    hsCode: "",
    cargoReadyDate: "",
    weight: "",
    volume: "",
    packages: "",
    services: [],
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    comments: "",
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
          delay: 0.2,
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  if (isSubmitted) {
    return (
      <div
        ref={formRef}
        className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-lg h-full flex flex-col items-center justify-center text-center"
      >
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <TbCheck className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Quote Request Received!</h3>
        <p className="text-gray-600 max-w-sm mb-6">
          Our logistics team will analyze your requirements and send you a competitive quote within 2-4 business hours.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
          <TbMail className="w-4 h-4" />
          Check your email for confirmation
        </div>
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
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <TbFileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Get a Quote</h2>
            <p className="text-gray-500 text-sm">Competitive shipping rates</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mt-6">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= step
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                    currentStep > step ? "bg-blue-500" : "bg-gray-100"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Shipment</span>
          <span>Cargo</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Step 1: Shipment Details */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            {/* Shipment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Shipment Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "import", label: "Import to Bangladesh", icon: TbPackage },
                  { value: "export", label: "Export from Bangladesh", icon: TbTruck },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.shipmentType === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipmentType"
                      value={option.value}
                      checked={formData.shipmentType === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <option.icon
                      className={`w-8 h-8 mb-2 ${
                        formData.shipmentType === option.value
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium text-center ${
                        formData.shipmentType === option.value
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transport Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode of Transport <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="transportMode"
                  value={formData.transportMode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300 appearance-none cursor-pointer"
                >
                  {transportModes.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
                <TbChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Origin & Destination */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origin Country/City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TbMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Shanghai, China"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Country/City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TbMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Dhaka, Bangladesh"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Cargo Details */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            {/* Commodity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commodity/Product Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="commodity"
                value={formData.commodity}
                onChange={handleChange}
                required
                placeholder="e.g., Garment Machinery, Cotton Fabrics"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
              />
            </div>

            {/* HS Code & Cargo Ready Date */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HS Code (if known)
                </label>
                <input
                  type="text"
                  name="hsCode"
                  value={formData.hsCode}
                  onChange={handleChange}
                  placeholder="e.g., 8452.10.00"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo Ready Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TbCalendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="cargoReadyDate"
                    value={formData.cargoReadyDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Weight, Volume, Packages */}
            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Weight (kg) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TbScale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    placeholder="500"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume (CBM)
                </label>
                <div className="relative">
                  <TbRuler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder="2.5"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. of Packages <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="packages"
                  value={formData.packages}
                  onChange={handleChange}
                  required
                  placeholder="10"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Additional Services
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {additionalServices.map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.services.includes(service.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          formData.services.includes(service.id)
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        <TbCheck
                          className={`w-3.5 h-3.5 text-white transition-opacity duration-300 ${
                            formData.services.includes(service.id)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </div>
                    </div>
                    <span
                      className={`text-sm ${
                        formData.services.includes(service.id)
                          ? "text-blue-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {service.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fadeIn">
            {/* Name & Company */}
            <div className="grid sm:grid-cols-2 gap-5">
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
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>
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
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
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
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
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
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={4}
                placeholder="Any special requirements or questions..."
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300 resize-none"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors duration-300"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300"
            >
              Next Step
              <TbArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  Submitting...
                </>
              ) : (
                <>
                  Request Quote
                  <TbArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Response Time Note */}
        <p className="text-center text-sm text-gray-500 mt-4">
          We'll respond within 2-4 business hours
        </p>
      </form>
    </div>
  );
};

export default QuoteRequestForm;
