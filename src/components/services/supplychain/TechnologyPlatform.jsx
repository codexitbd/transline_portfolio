import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbDeviceDesktop,
  TbGps,
  TbBell,
  TbClock,
  TbAlertCircle,
  TbChartLine,
  TbPackages,
  TbFileText,
  TbChartBar,
  TbApi,
  TbRefresh,
  TbFileAnalytics,
  TbDeviceMobile,
  TbBellRinging,
  TbCamera,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const TechnologyPlatform = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "tracking",
      icon: TbGps,
      title: "Real-Time Tracking",
      color: "blue",
      features: [
        { icon: TbGps, title: "GPS-Enabled Tracking", description: "Live location updates for all shipments" },
        { icon: TbBell, title: "Milestone Notifications", description: "Automated alerts at key checkpoints" },
        { icon: TbClock, title: "ETA Predictions", description: "Accurate delivery time estimates" },
        { icon: TbAlertCircle, title: "Exception Alerts", description: "Immediate notification of delays or damages" },
      ],
    },
    {
      id: "dashboard",
      icon: TbChartLine,
      title: "Online Dashboard",
      color: "emerald",
      features: [
        { icon: TbPackages, title: "Shipment Overview", description: "Complete view of all active shipments" },
        { icon: TbChartLine, title: "Inventory Levels", description: "Stock status across all locations" },
        { icon: TbFileText, title: "Order History", description: "Full documentation and records" },
        { icon: TbChartBar, title: "Analytics", description: "Performance metrics and insights" },
      ],
    },
    {
      id: "integration",
      icon: TbApi,
      title: "System Integration",
      color: "purple",
      features: [
        { icon: TbApi, title: "API Connectivity", description: "Seamless ERP/WMS integration" },
        { icon: TbRefresh, title: "Automated Exchange", description: "Real-time data synchronization" },
        { icon: TbFileAnalytics, title: "EDI Capabilities", description: "Electronic data interchange support" },
        { icon: TbFileText, title: "Custom Reporting", description: "Tailored reports for your needs" },
      ],
    },
    {
      id: "mobile",
      icon: TbDeviceMobile,
      title: "Mobile Access",
      color: "orange",
      features: [
        { icon: TbDeviceMobile, title: "Mobile App", description: "Track shipments on the go" },
        { icon: TbBellRinging, title: "Push Notifications", description: "Instant updates on your phone" },
        { icon: TbCamera, title: "Digital POD", description: "Photo capture proof of delivery" },
        { icon: TbGps, title: "Location Services", description: "Real-time driver tracking" },
      ],
    },
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-500", border: "border-blue-200" },
    emerald: { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-200" },
    purple: { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-500", border: "border-purple-200" },
    orange: { bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-500", border: "border-orange-200" },
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
        const tabButtons = tabsRef.current.querySelectorAll(".tab-button");
        gsap.fromTo(
          tabButtons,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2,
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
      const features = contentRef.current.querySelectorAll(".feature-card");
      const mockup = contentRef.current.querySelector(".platform-mockup");

      gsap.fromTo(
        mockup,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        features,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [activeTab]);

  const activeTabData = tabs[activeTab];
  const colors = colorClasses[activeTabData.color];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-10 md:mb-14">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbDeviceDesktop className="w-4 h-4" />
            Solution 6
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Technology-Driven Visibility
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Our digital logistics platform provides complete visibility 
            and control over your supply chain operations.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div
          ref={tabsRef}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === index;
            const tabColors = colorClasses[tab.color];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`tab-button flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? `${tabColors.bg} text-white shadow-lg`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Platform Mockup */}
          <div className="platform-mockup bg-gray-900 rounded-2xl p-4 md:p-6 order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-gray-400 text-sm">Trans Line Platform</span>
            </div>

            {/* Dynamic Content Based on Tab */}
            {activeTab === 0 && (
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm">Shipment #TL-28451</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">In Transit</span>
                  </div>
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-3/4 bg-blue-500 rounded-full" />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Origin</span>
                    <span>75%</span>
                    <span>Destination</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <TbClock className="w-5 h-5 text-blue-400 mb-2" />
                    <div className="text-white font-semibold">2h 45m</div>
                    <div className="text-gray-500 text-xs">ETA</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <TbGps className="w-5 h-5 text-green-400 mb-2" />
                    <div className="text-white font-semibold">Live</div>
                    <div className="text-gray-500 text-xs">GPS Status</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active", value: "124", color: "text-emerald-400" },
                    { label: "Delivered", value: "1,847", color: "text-blue-400" },
                    { label: "Pending", value: "23", color: "text-yellow-400" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-3 text-center">
                      <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-gray-500 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-3">Weekly Performance</div>
                  <div className="flex items-end gap-1 h-20">
                    {[60, 75, 45, 90, 70, 85, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-emerald-500/60 hover:bg-emerald-500 rounded-t transition-colors"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <TbApi className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-medium">API Status</span>
                    <span className="ml-auto px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">Connected</span>
                  </div>
                  <div className="space-y-2">
                    {["ERP System", "WMS", "TMS"].map((sys, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{sys}</span>
                        <span className="text-green-400">● Active</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-2">Last Sync</div>
                  <div className="text-white">2 minutes ago</div>
                  <div className="text-gray-500 text-xs mt-1">1,247 records processed</div>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="w-16 h-28 mx-auto bg-gray-700 rounded-xl border-2 border-gray-600 flex items-center justify-center mb-3">
                    <TbDeviceMobile className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="text-white font-medium">Trans Line Mobile</div>
                  <div className="text-gray-500 text-xs mt-1">iOS & Android</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-400">5K+</div>
                    <div className="text-gray-500 text-xs">Downloads</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-400">4.8</div>
                    <div className="text-gray-500 text-xs">App Rating</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {activeTabData.title}
              </h3>
              <p className="text-gray-500">
                Powerful features to keep you connected and in control.
              </p>
            </div>

            {activeTabData.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`feature-card flex items-start gap-4 p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:${colors.border} rounded-2xl transition-all duration-300 cursor-pointer group hover:shadow-md`}
                >
                  <div
                    className={`shrink-0 w-12 h-12 ${colors.light} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                  <TbArrowRight className="shrink-0 w-5 h-5 text-gray-300 group-hover:text-gray-500 ml-auto self-center opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyPlatform;
