import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbDatabase,
  TbEye,
  TbArrowsSort,
  TbReportAnalytics,
  TbShoppingCart,
  TbPackage,
  TbArrowsCross,
  TbTruckDelivery,
  TbTag,
  TbPuzzle,
  TbBox,
  TbStack2,
  TbBarcode,
  TbSearch,
  TbContainer,
  TbParking,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const WarehouseServices = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef([]);
  const contentRef = useRef(null);

  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      title: "Inventory Management",
      icon: TbDatabase,
      color: "bg-blue-500",
      items: [
        { icon: TbDatabase, text: "WMS (Warehouse Management System)" },
        { icon: TbEye, text: "Real-time Stock Visibility" },
        { icon: TbArrowsSort, text: "FIFO/LIFO Management" },
        { icon: TbReportAnalytics, text: "Automated Reporting" },
      ],
    },
    {
      title: "Distribution Services",
      icon: TbTruckDelivery,
      color: "bg-emerald-500",
      items: [
        { icon: TbShoppingCart, text: "Order Fulfillment" },
        { icon: TbPackage, text: "Pick and Pack Operations" },
        { icon: TbArrowsCross, text: "Cross-Docking" },
        { icon: TbTruckDelivery, text: "Last-Mile Delivery Coordination" },
      ],
    },
    {
      title: "Value-Added Services",
      icon: TbPuzzle,
      color: "bg-purple-500",
      items: [
        { icon: TbTag, text: "Labeling and Re-labeling" },
        { icon: TbPuzzle, text: "Kitting and Assembly" },
        { icon: TbBox, text: "Shrink Wrapping" },
        { icon: TbStack2, text: "Palletization" },
        { icon: TbBarcode, text: "Barcode Scanning" },
        { icon: TbSearch, text: "Quality Inspection" },
      ],
    },
    {
      title: "Container Storage",
      icon: TbContainer,
      color: "bg-amber-500",
      items: [
        { icon: TbContainer, text: "FCL Container Storage Yard" },
        { icon: TbParking, text: "Empty Container Depot" },
      ],
    },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Content animation on tab change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );

      // Animate items
      const items = contentRef.current.querySelectorAll(".service-item");
      gsap.fromTo(
        items,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [activeTab]);

  const ActiveIcon = services[activeTab].icon;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Services Offered
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive warehousing services tailored to streamline your 
            supply chain operations and reduce costs.
          </p>
        </div>

        {/* Tabs and Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tabs */}
          <div className="lg:col-span-1 space-y-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  ref={(el) => (tabsRef.current[index] = el)}
                  onClick={() => setActiveTab(index)}
                  className={`w-full flex items-center gap-4 p-5 rounded-xl transition-all duration-300 text-left ${
                    isActive
                      ? `${service.color} text-white shadow-lg`
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? "bg-white/20" : `${service.color}/10`
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? "text-white" : service.color.replace("bg-", "text-")
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{service.title}</h4>
                    <p
                      className={`text-sm ${
                        isActive ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {service.items.length} services
                    </p>
                  </div>
                  <TbArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isActive ? "translate-x-1" : ""
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <div
              ref={contentRef}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div
                  className={`w-16 h-16 ${services[activeTab].color} rounded-2xl flex items-center justify-center`}
                >
                  <ActiveIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {services[activeTab].title}
                  </h3>
                  <p className="text-gray-500">
                    {services[activeTab].items.length} services available
                  </p>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {services[activeTab].items.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={index}
                      className="service-item flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div
                        className={`w-10 h-10 ${services[activeTab].color}/10 rounded-lg flex items-center justify-center shrink-0`}
                      >
                        <ItemIcon
                          className={`w-5 h-5 ${services[activeTab].color.replace(
                            "bg-",
                            "text-"
                          )}`}
                        />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseServices;
