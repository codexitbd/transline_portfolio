import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbBuildingWarehouse,
  TbMapPin,
  TbShieldCheck,
  TbReload,
  TbChartBar,
  TbDeviceDesktop,
  TbChartLine,
  TbBell,
  TbCalendar,
  TbDatabase,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const InventoryManagement = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const inventoryPlacement = {
    title: "Strategic Inventory Placement",
    icon: TbBuildingWarehouse,
    description: "Optimize inventory across your warehouse network for maximum efficiency.",
    features: [
      { icon: TbMapPin, title: "Multi-Location Warehousing", description: "Strategic placement across key markets" },
      { icon: TbShieldCheck, title: "Safety Stock Management", description: "Maintain optimal buffer levels" },
      { icon: TbReload, title: "Cycle Counting & Audit", description: "Regular inventory accuracy checks" },
      { icon: TbChartBar, title: "ABC Analysis", description: "Prioritize high-value inventory items" },
    ],
  };

  const realTimeVisibility = {
    title: "Real-Time Visibility",
    icon: TbDeviceDesktop,
    description: "Complete visibility into your inventory with advanced WMS integration.",
    features: [
      { icon: TbDatabase, title: "WMS Integration", description: "Seamless connection with your ERP systems" },
      { icon: TbChartLine, title: "Live Dashboards", description: "Real-time inventory levels at a glance" },
      { icon: TbBell, title: "Automated Alerts", description: "Stock level notifications and triggers" },
      { icon: TbCalendar, title: "Expiry Tracking", description: "FEFO management for dated goods" },
    ],
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

      // Left card animation
      if (leftCardRef.current) {
        const features = leftCardRef.current.querySelectorAll(".feature-item");
        gsap.fromTo(
          leftCardRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          features,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leftCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Right card animation
      if (rightCardRef.current) {
        const mockup = rightCardRef.current.querySelector(".dashboard-mockup");
        const features = rightCardRef.current.querySelectorAll(".visibility-feature");

        gsap.fromTo(
          rightCardRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          mockup,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          features,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Feature highlight animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbBuildingWarehouse className="w-4 h-4" />
            Solution 3
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Warehousing & Inventory Management
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Strategic inventory placement and real-time visibility for optimal 
            stock management across your network.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Card - Strategic Inventory Placement */}
          <div
            ref={leftCardRef}
            className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <TbBuildingWarehouse className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {inventoryPlacement.title}
                </h3>
                <p className="text-gray-500 text-sm mt-0.5">
                  {inventoryPlacement.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {inventoryPlacement.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="feature-item flex items-start gap-4 p-4 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors duration-300 cursor-pointer group"
                  >
                    <div className="shrink-0 w-10 h-10 bg-white group-hover:bg-purple-100 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-purple-200 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gray-500 group-hover:text-purple-500 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Card - Real-Time Visibility */}
          <div
            ref={rightCardRef}
            className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <TbDeviceDesktop className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {realTimeVisibility.title}
                </h3>
                <p className="text-gray-500 text-sm mt-0.5">
                  {realTimeVisibility.description}
                </p>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="dashboard-mockup bg-gray-900 rounded-2xl p-4 mb-6 overflow-hidden">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total SKUs", value: "2,458", trend: "+12%" },
                  { label: "In Stock", value: "2,301", trend: "94%" },
                  { label: "Low Stock", value: "47", trend: "-8%" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`bg-gray-800 rounded-lg p-3 ${
                      activeFeature === index ? "ring-2 ring-emerald-400" : ""
                    } transition-all duration-300`}
                  >
                    <div className="text-xs text-gray-400">{item.label}</div>
                    <div className="text-lg font-bold text-white mt-1">{item.value}</div>
                    <div className={`text-xs mt-1 ${index === 2 ? "text-red-400" : "text-emerald-400"}`}>
                      {item.trend}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-16 bg-gray-800 rounded-lg flex items-end p-2 gap-1">
                {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 90].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t transition-all duration-500 ${
                      i === activeFeature + 8 ? "bg-emerald-400" : "bg-gray-600"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {realTimeVisibility.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`visibility-feature p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                      activeFeature === index
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-gray-50 border-gray-100 hover:border-emerald-200"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mb-2 ${
                        activeFeature === index ? "text-emerald-500" : "text-gray-400"
                      }`}
                    />
                    <h4 className="font-medium text-gray-900 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors duration-300"
          >
            Optimize Your Inventory
            <TbArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InventoryManagement;
