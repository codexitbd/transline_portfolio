import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbShip,
  TbContainer,
  TbPackage,
  TbTemperature,
  TbCrane,
  TbArrowsExchange,
  TbCheck,
  TbCoin,
  TbWorld,
  TbLeaf,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const OceanFreightSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef([]);
  const contentRef = useRef(null);
  const partnersRef = useRef(null);
  const routesRef = useRef([]);
  const benefitsRef = useRef([]);

  const [activeTab, setActiveTab] = React.useState(0);

  const fclFeatures = [
    { icon: TbContainer, text: "20ft, 40ft, and 40ft HC containers" },
    { icon: TbTemperature, text: "Dry, refrigerated, flat rack, and open-top options" },
    { icon: TbArrowsExchange, text: "Direct or transshipment routes" },
    { icon: TbShip, text: "Port-to-port and door-to-door services" },
    { icon: TbPackage, text: "Import & export handling" },
  ];

  const lclFeatures = [
    { icon: TbPackage, text: "Consolidated shipments for smaller volumes" },
    { icon: TbArrowsExchange, text: "Weekly consolidation to major ports" },
    { icon: TbCoin, text: "Competitive groupage rates" },
    { icon: TbCrane, text: "Professional cargo handling at CFS" },
  ];

  const breakBulkFeatures = [
    { icon: TbCrane, text: "Non-containerized heavy equipment" },
    { icon: TbPackage, text: "Oversized machinery handling" },
    { icon: TbShip, text: "Industrial project shipments" },
    { icon: TbArrowsExchange, text: "Ro-Ro services available" },
  ];

  const tabs = [
    { title: "FCL", subtitle: "Full Container Load", features: fclFeatures },
    { title: "LCL", subtitle: "Less than Container Load", features: lclFeatures },
    { title: "Break Bulk", subtitle: "Project Cargo", features: breakBulkFeatures },
  ];

  const shippingLines = [
    "Maersk",
    "MSC",
    "CMA CGM",
    "Evergreen",
    "COSCO",
    "Hapag-Lloyd",
    "ONE",
    "Yang Ming",
  ];

  const tradeRoutes = [
    { from: "Bangladesh", to: "Far East", countries: "China, Japan, Korea, Singapore" },
    { from: "Bangladesh", to: "Europe", ports: "Rotterdam, Hamburg, Felixstowe" },
    { from: "Bangladesh", to: "North America", countries: "USA, Canada" },
    { from: "Bangladesh", to: "Middle East", ports: "Dubai, Jeddah" },
    { from: "Bangladesh", to: "Indian Subcontinent", countries: "India, Sri Lanka, Pakistan" },
  ];

  const benefits = [
    { icon: TbCoin, text: "Most economical for large volumes" },
    { icon: TbPackage, text: "Suitable for all cargo types" },
    { icon: TbWorld, text: "Extensive global coverage" },
    { icon: TbLeaf, text: "Environmentally friendly option" },
  ];

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

      // Tabs animation
      tabsRef.current.forEach((tab, index) => {
        if (!tab) return;
        gsap.fromTo(
          tab,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tab,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Partners animation
      if (partnersRef.current) {
        gsap.fromTo(
          partnersRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: partnersRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Trade routes animation
      routesRef.current.forEach((route, index) => {
        if (!route) return;
        gsap.fromTo(
          route,
          { x: index % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: route,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Benefits animation
      benefitsRef.current.forEach((benefit, index) => {
        if (!benefit) return;
        gsap.fromTo(
          benefit,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: benefit,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tab change animation
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center">
              <TbShip className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
                Ocean Freight
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Ocean Freight Services
              </h2>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl text-lg">
            For large volumes and cost-efficient shipping, our ocean freight solutions offer 
            comprehensive FCL, LCL, and break bulk services connecting Bangladesh to global markets.
          </p>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          {/* Tab Headers */}
          <div className="flex flex-wrap gap-4 mb-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                ref={(el) => (tabsRef.current[index] = el)}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="text-lg">{tab.title}</div>
                <div className={`text-xs ${activeTab === index ? "text-emerald-100" : "text-gray-500"}`}>
                  {tab.subtitle}
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            ref={contentRef}
            className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tabs[activeTab].features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl"
                  >
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Shipping Lines */}
        <div ref={partnersRef} className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            Partner Shipping Lines
          </h3>
          <div className="flex flex-wrap gap-3">
            {shippingLines.map((line, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300"
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Trade Routes */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            Major Trade Routes
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tradeRoutes.map((route, index) => (
              <div
                key={index}
                ref={(el) => (routesRef.current[index] = el)}
                className="group p-5 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-200 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-gray-900">{route.from}</span>
                  <TbArrowsExchange className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-bold text-emerald-600">{route.to}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {route.countries || route.ports}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                ref={(el) => (benefitsRef.current[index] = el)}
                className="group p-6 bg-emerald-50 rounded-2xl hover:bg-emerald-500 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-emerald-500 group-hover:bg-white rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-white group-hover:text-emerald-500 transition-colors duration-300" />
                </div>
                <span className="text-gray-800 group-hover:text-white font-semibold transition-colors duration-300">
                  {benefit.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OceanFreightSection;
