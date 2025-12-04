import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbPackageExport,
  TbPackageImport,
  TbClipboardCheck,
  TbScale,
  TbFileCheck,
  TbContainer,
  TbEye,
  TbBuildingBank,
  TbTruckDelivery,
  TbReceipt,
  TbFileDescription,
  TbClipboardList,
  TbReceipt2,
  TbFileInvoice,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const CargoHandling = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const docsRef = useRef(null);

  const handlingServices = [
    {
      type: "Export",
      icon: TbPackageExport,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      items: [
        { icon: TbClipboardCheck, text: "Cargo Receipt & Inspection" },
        { icon: TbScale, text: "Measurement & Weighing" },
        { icon: TbFileCheck, text: "Documentation Verification" },
        { icon: TbContainer, text: "Container Stuffing Supervision" },
        { icon: TbEye, text: "VGM (Verified Gross Mass) Certification" },
        { icon: TbBuildingBank, text: "Customs Examination Facilitation" },
      ],
    },
    {
      type: "Import",
      icon: TbPackageImport,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      items: [
        { icon: TbContainer, text: "Container De-stuffing" },
        { icon: TbClipboardList, text: "Cargo Identification & Segregation" },
        { icon: TbBuildingBank, text: "Customs Examination Support" },
        { icon: TbTruckDelivery, text: "Delivery to Consignee Warehouse" },
        { icon: TbReceipt, text: "DO (Delivery Order) Processing" },
      ],
    },
  ];

  const documentationSupport = [
    { icon: TbFileDescription, text: "Bill of Lading Processing" },
    { icon: TbClipboardList, text: "Cargo Manifest Preparation" },
    { icon: TbReceipt2, text: "Warehouse Receipt Issuance" },
    { icon: TbFileInvoice, text: "Cargo Release Orders" },
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

        const icon = card.querySelector(".type-icon");
        const items = card.querySelectorAll(".handling-item");

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
            { scale: 0, rotation: -90 },
            { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.4"
          )
          .fromTo(
            items,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.3"
          );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      // Docs section animation
      if (docsRef.current) {
        const docItems = docsRef.current.querySelectorAll(".doc-item");
        
        gsap.fromTo(
          docsRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: docsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          docItems,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: docsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 text-sm font-medium rounded-full mb-4">
            Import & Export
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cargo Handling Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Professional cargo handling for both export and import operations 
            with comprehensive documentation support.
          </p>
        </div>

        {/* Export & Import Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {handlingServices.map((service, index) => {
            const TypeIcon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className={`${service.color} p-6`}>
                  <div className="flex items-center gap-4">
                    <div className="type-icon w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <TypeIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {service.type} Cargo Handling
                      </h3>
                      <p className="text-white/80 text-sm">
                        {service.items.length} services
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6">
                  <div className="grid gap-3">
                    {service.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="handling-item flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
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
              </div>
            );
          })}
        </div>

        {/* Documentation Support */}
        <div
          ref={docsRef}
          className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center gap-3">
            <TbFileDescription className="w-6 h-6 text-amber-500" />
            Documentation Support
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentationSupport.map((doc, index) => {
              const DocIcon = doc.icon;
              return (
                <div
                  key={index}
                  className="doc-item flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors duration-300 cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-amber-100 group-hover:bg-amber-200 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                    <DocIcon className="w-7 h-7 text-amber-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">
                    {doc.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CargoHandling;
