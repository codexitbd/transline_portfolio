import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbFileImport,
  TbFileText,
  TbFileCheck,
  TbPackage,
  TbCertificate,
  TbLicense,
  TbShieldCheck,
  TbFileDescription,
  TbCategory,
  TbCalculator,
  TbPercentage,
  TbReceipt,
  TbCoin,
  TbReportMoney,
  TbClipboardList,
  TbSearch,
  TbScale,
  TbCreditCard,
  TbCircleCheck,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const ImportClearance = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef([]);
  const contentRef = useRef(null);

  const [activeTab, setActiveTab] = useState(0);

  const importServices = [
    {
      title: "Documentation",
      icon: TbFileText,
      color: "bg-blue-500",
      items: [
        { icon: TbFileDescription, text: "Bill of Lading / Airway Bill processing" },
        { icon: TbFileCheck, text: "Commercial Invoice verification" },
        { icon: TbPackage, text: "Packing List preparation" },
        { icon: TbCertificate, text: "Certificate of Origin authentication" },
        { icon: TbLicense, text: "Import Permit procurement" },
        { icon: TbClipboardList, text: "IRC (Import Registration Certificate) liaison" },
        { icon: TbShieldCheck, text: "Insurance documents handling" },
      ],
    },
    {
      title: "HS Classification",
      icon: TbCategory,
      color: "bg-purple-500",
      items: [
        { icon: TbCategory, text: "Accurate product classification under Harmonized System" },
        { icon: TbCalculator, text: "Ensuring correct duty calculation" },
        { icon: TbShieldCheck, text: "Avoiding misclassification penalties" },
        { icon: TbFileText, text: "Expert knowledge of tariff schedules" },
      ],
    },
    {
      title: "Duty & Tax",
      icon: TbCalculator,
      color: "bg-emerald-500",
      items: [
        { icon: TbPercentage, text: "Customs Duty assessment" },
        { icon: TbReceipt, text: "Supplementary Duty calculation" },
        { icon: TbCoin, text: "VAT (Value Added Tax) computation" },
        { icon: TbReportMoney, text: "Advance Income Tax (AIT) determination" },
        { icon: TbPercentage, text: "Regulatory Duty where applicable" },
        { icon: TbCalculator, text: "Total landed cost estimation" },
      ],
    },
    {
      title: "Clearance Process",
      icon: TbClipboardList,
      color: "bg-amber-500",
      items: [
        { icon: TbFileText, text: "Bill of Entry filing with customs" },
        { icon: TbSearch, text: "Customs examination coordination" },
        { icon: TbScale, text: "Valuation dispute resolution" },
        { icon: TbFileCheck, text: "Assessment finalization" },
        { icon: TbCreditCard, text: "Duty payment processing" },
        { icon: TbCircleCheck, text: "Out-of-charge facilitation" },
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
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );

      const items = contentRef.current.querySelectorAll(".import-item");
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

  const ActiveIcon = importServices[activeTab].icon;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center">
              <TbFileImport className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                Import Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Import Clearance
              </h2>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl text-lg">
            Comprehensive import clearance services covering documentation, classification, 
            duty calculation, and complete customs process management.
          </p>
        </div>

        {/* Tabs and Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tabs */}
          <div className="lg:col-span-1 space-y-3">
            {importServices.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  ref={(el) => (tabsRef.current[index] = el)}
                  onClick={() => setActiveTab(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                    isActive
                      ? `${service.color} text-white shadow-lg`
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? "bg-white/20" : `${service.color}/10`
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : service.color.replace("bg-", "text-")
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{service.title}</h4>
                    <p className={`text-xs ${isActive ? "text-white/80" : "text-gray-500"}`}>
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
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm h-full"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div
                  className={`w-14 h-14 ${importServices[activeTab].color} rounded-2xl flex items-center justify-center`}
                >
                  <ActiveIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {importServices[activeTab].title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {importServices[activeTab].items.length} services included
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="grid sm:grid-cols-2 gap-3">
                {importServices[activeTab].items.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={index}
                      className="import-item flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div
                        className={`w-9 h-9 ${importServices[activeTab].color}/10 rounded-lg flex items-center justify-center shrink-0`}
                      >
                        <ItemIcon
                          className={`w-4 h-4 ${importServices[activeTab].color.replace(
                            "bg-",
                            "text-"
                          )}`}
                        />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">
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

export default ImportClearance;
