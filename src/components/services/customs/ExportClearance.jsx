import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbFileExport,
  TbFileText,
  TbCertificate,
  TbFileCheck,
  TbClipboardList,
  TbStethoscope,
  TbFileDescription,
  TbSearch,
  TbCircleCheck,
  TbBuildingWarehouse,
  TbReceipt,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const ExportClearance = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const exportServices = [
    {
      title: "Export Documentation",
      icon: TbFileText,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      items: [
        { icon: TbFileDescription, text: "Shipping Bill preparation" },
        { icon: TbCertificate, text: "GSP Certificate of Origin" },
        { icon: TbFileCheck, text: "Export LC documentation" },
        { icon: TbClipboardList, text: "Pre-shipment inspection certificates" },
        { icon: TbFileText, text: "Export permit processing" },
        { icon: TbStethoscope, text: "Phytosanitary/health certificates" },
      ],
    },
    {
      title: "Export Procedures",
      icon: TbClipboardList,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      items: [
        { icon: TbFileDescription, text: "EXP form submission" },
        { icon: TbSearch, text: "Customs examination support" },
        { icon: TbCircleCheck, text: "Let Export Order obtainment" },
        { icon: TbBuildingWarehouse, text: "Bonded warehouse withdrawal" },
        { icon: TbReceipt, text: "Duty drawback processing" },
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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icon = card.querySelector(".card-icon");
        const items = card.querySelectorAll(".export-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { x: index === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        )
          .fromTo(
            icon,
            { scale: 0, rotation: -45 },
            { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.4"
          )
          .fromTo(
            items,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.2"
          );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center">
              <TbFileExport className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
                Export Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Export Clearance
              </h2>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl text-lg">
            Complete export clearance services including documentation preparation, 
            customs procedures, and duty drawback processing.
          </p>
        </div>

        {/* Export Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {exportServices.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`card-icon w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center`}
                  >
                    <ServiceIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {service.items.length} services
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {service.items.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="export-item flex items-center gap-4 p-3 bg-white rounded-xl hover:shadow-sm transition-all duration-200"
                      >
                        <div
                          className={`w-10 h-10 ${service.lightColor} rounded-lg flex items-center justify-center shrink-0`}
                        >
                          <ItemIcon
                            className={`w-5 h-5 ${service.color.replace("bg-", "text-")}`}
                          />
                        </div>
                        <span className="text-gray-700 font-medium text-sm">
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExportClearance;
