import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbRoute,
  TbMapPin,
  TbTruck,
  TbPackages,
  TbChartArrows,
  TbChartLine,
  TbCalendarStats,
  TbLayersLinked,
  TbRefresh,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const PlanningDesign = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "network",
      icon: TbRoute,
      title: "Network Optimization",
      description: "Strategic planning for efficient distribution networks that minimize costs and maximize service levels.",
      features: [
        {
          icon: TbMapPin,
          title: "Distribution Center Analysis",
          description: "Optimal location selection based on demand patterns and cost factors",
        },
        {
          icon: TbTruck,
          title: "Route Optimization",
          description: "Cost and time-efficient routing for all transportation modes",
        },
        {
          icon: TbPackages,
          title: "Inventory Positioning",
          description: "Strategic stock placement across warehouse network",
        },
        {
          icon: TbChartArrows,
          title: "Multi-Modal Planning",
          description: "Seamless integration of air, sea, and land transport",
        },
      ],
    },
    {
      id: "demand",
      icon: TbChartLine,
      title: "Demand Planning",
      description: "Data-driven forecasting and inventory strategies to meet customer demand efficiently.",
      features: [
        {
          icon: TbChartLine,
          title: "Forecasting Support",
          description: "Advanced analytics for accurate demand predictions",
        },
        {
          icon: TbCalendarStats,
          title: "Seasonal Management",
          description: "Planning for peak seasons and demand fluctuations",
        },
        {
          icon: TbLayersLinked,
          title: "Buffer Stock",
          description: "Safety stock recommendations based on service levels",
        },
        {
          icon: TbRefresh,
          title: "Replenishment Strategies",
          description: "Automated reorder points and quantity optimization",
        },
      ],
    },
  ];

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
      gsap.fromTo(
        tabsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Content change animation
    if (contentRef.current) {
      const cards = contentRef.current.querySelectorAll(".feature-card");
      const description = contentRef.current.querySelector(".tab-description");

      gsap.fromTo(
        description,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      gsap.fromTo(
        cards,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeTab]);

  const activeTabData = tabs[activeTab];
  const ActiveIcon = activeTabData.icon;

  return (
    <section ref={sectionRef} id="solutions" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-10 md:mb-14">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbRoute className="w-4 h-4" />
            Solution 1
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Supply Chain Planning & Design
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Strategic planning and network optimization for efficient, 
            cost-effective supply chain operations.
          </p>
        </div>

        {/* Tab Navigation */}
        <div ref={tabsRef} className="flex justify-center gap-4 mb-10">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === index;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div ref={contentRef} className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm">
          {/* Tab Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
              <ActiveIcon className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {activeTabData.title}
              </h3>
              <p className="tab-description text-gray-500 mt-1">
                {activeTabData.description}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {activeTabData.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={index}
                  className="feature-card group bg-gray-50 hover:bg-white border border-gray-100 hover:border-orange-200 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-11 h-11 bg-white group-hover:bg-orange-50 border border-gray-200 group-hover:border-orange-200 rounded-xl flex items-center justify-center transition-colors duration-300">
                      <FeatureIcon className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-500">
              Need a custom supply chain solution?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-orange-500 font-medium hover:text-orange-600 transition-colors"
            >
              Consult Our Experts
              <TbArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanningDesign;
