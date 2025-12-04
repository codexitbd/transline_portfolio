import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbLicense,
  TbCertificate,
  TbFileCheck,
  TbBuildingWarehouse,
  TbShieldCheck,
  TbBook,
  TbAlertCircle,
  TbScale,
  TbStethoscope,
  TbBulb,
  TbCalculator,
  TbFileText,
  TbMessageQuestion,
  TbWorld,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const LicensingCompliance = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const licensingRef = useRef(null);
  const complianceRef = useRef(null);
  const advisoryRef = useRef(null);
  const itemsRef = useRef([]);

  const licensingServices = [
    { icon: TbCertificate, text: "BSTI Import Permits" },
    { icon: TbStethoscope, text: "DGDA (Pharmaceuticals)" },
    { icon: TbFileCheck, text: "BFSA (Food Safety)" },
    { icon: TbWorld, text: "BTRC (Telecom)" },
    { icon: TbLicense, text: "IRC Registration" },
    { icon: TbFileText, text: "ERC Registration" },
    { icon: TbBuildingWarehouse, text: "Bonded Warehouse License" },
  ];

  const complianceServices = [
    { icon: TbBook, text: "NBR regulations compliance" },
    { icon: TbShieldCheck, text: "Import/export policy compliance" },
    { icon: TbAlertCircle, text: "Prohibited/restricted goods advisory" },
    { icon: TbScale, text: "Anti-dumping measures" },
    { icon: TbStethoscope, text: "Sanitary requirements" },
  ];

  const advisoryServices = [
    { icon: TbCalculator, text: "Duty optimization strategies" },
    { icon: TbBook, text: "Import policy interpretation" },
    { icon: TbFileText, text: "Document preparation guidance" },
    { icon: TbMessageQuestion, text: "Advance rulings from customs" },
    { icon: TbWorld, text: "Trade agreement benefits (SAFTA, APTA)" },
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

      // Cards animation
      [licensingRef.current, complianceRef.current, advisoryRef.current].forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateX: -10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      // Items animation
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            delay: index * 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let itemIndex = 0;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 text-sm font-medium rounded-full mb-4">
            <TbLicense className="w-4 h-4" />
            Licensing & Compliance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Licensing, Permits & Compliance
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We assist in procuring all necessary licenses, ensure regulatory compliance, 
            and provide expert advisory for your import/export operations.
          </p>
        </div>

        {/* Three Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Licensing Card */}
          <div
            ref={licensingRef}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <TbLicense className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Licensing & Permits
              </h3>
            </div>
            <div className="space-y-2">
              {licensingServices.map((item, idx) => {
                const Icon = item.icon;
                const currentIndex = itemIndex++;
                return (
                  <div
                    key={idx}
                    ref={(el) => (itemsRef.current[currentIndex] = el)}
                    className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compliance Card */}
          <div
            ref={complianceRef}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center">
                <TbShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Regulatory Compliance
              </h3>
            </div>
            <div className="space-y-2">
              {complianceServices.map((item, idx) => {
                const Icon = item.icon;
                const currentIndex = itemIndex++;
                return (
                  <div
                    key={idx}
                    ref={(el) => (itemsRef.current[currentIndex] = el)}
                    className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg hover:bg-rose-50 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advisory Card */}
          <div
            ref={advisoryRef}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                <TbBulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Import/Export Advisory
              </h3>
            </div>
            <div className="space-y-2">
              {advisoryServices.map((item, idx) => {
                const Icon = item.icon;
                const currentIndex = itemIndex++;
                return (
                  <div
                    key={idx}
                    ref={(el) => (itemsRef.current[currentIndex] = el)}
                    className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg hover:bg-cyan-50 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicensingCompliance;
