import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbHanger,
  TbShoppingCart,
  TbPill,
  TbBottle,
  TbDeviceMobile,
  TbBuildingFactory,
  TbArrowRight,
  TbCircleCheck,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const SCMIndustries = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const [activeIndustry, setActiveIndustry] = useState(0);

  const industries = [
    {
      id: "garments",
      icon: TbHanger,
      title: "Garments & Apparel",
      description: "End-to-end supply chain solutions for the textile and apparel industry, from factory to retail.",
      solutions: [
        "Factory consolidation services",
        "Fast fashion logistics",
        "Buyer compliance (RSN, SCAN)",
        "Hanging garment transportation",
      ],
      stats: { value: "500+", label: "Manufacturers Served" },
      color: "rose",
    },
    {
      id: "ecommerce",
      icon: TbShoppingCart,
      title: "E-commerce",
      description: "Scalable fulfillment solutions designed for the unique demands of online retail.",
      solutions: [
        "Order fulfillment centers",
        "Same-day/next-day delivery",
        "COD reconciliation",
        "Returns processing",
      ],
      stats: { value: "1M+", label: "Orders Processed" },
      color: "blue",
    },
    {
      id: "pharma",
      icon: TbPill,
      title: "Pharmaceuticals",
      description: "GDP-compliant logistics ensuring product integrity throughout the supply chain.",
      solutions: [
        "GDP-compliant warehousing",
        "Temperature-controlled distribution",
        "Batch tracking & traceability",
        "Regulatory compliance",
      ],
      stats: { value: "100%", label: "Compliance Rate" },
      color: "emerald",
    },
    {
      id: "fmcg",
      icon: TbBottle,
      title: "FMCG & Retail",
      description: "High-frequency distribution solutions for fast-moving consumer goods.",
      solutions: [
        "High-frequency distribution",
        "Store delivery management",
        "Promotional goods handling",
        "Multi-format retail support",
      ],
      stats: { value: "2,000+", label: "Store Deliveries/Day" },
      color: "amber",
    },
    {
      id: "electronics",
      icon: TbDeviceMobile,
      title: "Electronics",
      description: "Specialized logistics for sensitive electronic products and components.",
      solutions: [
        "Anti-static storage facilities",
        "Insurance & security measures",
        "Service parts distribution",
        "Warranty management logistics",
      ],
      stats: { value: "99.9%", label: "Damage-Free Rate" },
      color: "purple",
    },
  ];

  const colorClasses = {
    rose: { bg: "bg-rose-500", light: "bg-rose-50", text: "text-rose-500", border: "border-rose-200" },
    blue: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-500", border: "border-blue-200" },
    emerald: { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-200" },
    amber: { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-500", border: "border-amber-200" },
    purple: { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-500", border: "border-purple-200" },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".animate-heading"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tabs animation
      if (tabsRef.current) {
        const tabs = tabsRef.current.querySelectorAll(".industry-tab");
        gsap.fromTo(
          tabs,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Content animation on tab change
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll(".animate-content");
      gsap.fromTo(
        elements,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }
  }, [activeIndustry]);

  const activeData = industries[activeIndustry];
  const colors = colorClasses[activeData.color];
  const ActiveIcon = activeData.icon;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbBuildingFactory className="w-4 h-4" />
            Industry Solutions
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Tailored supply chain solutions for each industry's unique 
            requirements and challenges.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left - Industry Tabs */}
          <div ref={tabsRef} className="lg:col-span-4 space-y-3">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const tabColors = colorClasses[industry.color];
              const isActive = activeIndustry === index;

              return (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndustry(index)}
                  className={`industry-tab w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                    isActive
                      ? `bg-white border-2 ${tabColors.border} shadow-md`
                      : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isActive ? tabColors.light : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isActive ? tabColors.text : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold truncate transition-colors duration-300 ${
                        isActive ? "text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {industry.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {industry.solutions.length} solutions
                    </p>
                  </div>
                  <TbArrowRight
                    className={`shrink-0 w-5 h-5 transition-all duration-300 ${
                      isActive ? `${tabColors.text} translate-x-1` : "text-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right - Industry Content */}
          <div ref={contentRef} className="lg:col-span-8">
            <div className={`bg-gray-50 border ${colors.border} rounded-3xl p-6 md:p-10`}>
              {/* Header */}
              <div className="animate-content flex items-start gap-5 mb-8">
                <div className={`shrink-0 w-16 h-16 ${colors.light} rounded-2xl flex items-center justify-center`}>
                  <ActiveIcon className={`w-8 h-8 ${colors.text}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {activeData.title}
                  </h3>
                  <p className="text-gray-600">{activeData.description}</p>
                </div>
              </div>

              {/* Solutions Grid */}
              <div className="animate-content grid sm:grid-cols-2 gap-4 mb-8">
                {activeData.solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100"
                  >
                    <div className={`shrink-0 w-8 h-8 ${colors.light} rounded-lg flex items-center justify-center`}>
                      <TbCircleCheck className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <span className="text-gray-700 font-medium">{solution}</span>
                  </div>
                ))}
              </div>

              {/* Stats & CTA */}
              <div className="animate-content flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">
                      {activeData.stats.value.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {activeData.stats.value}
                    </div>
                    <div className="text-sm text-gray-500">
                      {activeData.stats.label}
                    </div>
                  </div>
                </div>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 px-6 py-3 ${colors.bg} hover:opacity-90 text-white font-medium rounded-xl transition-opacity duration-300`}
                >
                  Get Industry Solution
                  <TbArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SCMIndustries;
