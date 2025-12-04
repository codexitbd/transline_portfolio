import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbContainer,
  TbPackageExport,
  TbPackageImport,
  TbPackages,
  TbArrowsExchange,
  TbTruckDelivery,
  TbCalendar,
  TbCoin,
  TbUsers,
  TbClipboardList,
  TbFileCheck,
  TbFileDescription,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const CFSOperations = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const infoRef = useRef(null);
  const cardsRef = useRef([]);

  const cfsServices = [
    {
      title: "Stuffing & De-Stuffing",
      icon: TbPackageExport,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      items: [
        "Professional container loading/unloading",
        "Cargo segregation and sorting",
        "Damage inspection and reporting",
        "Tally sheet preparation",
      ],
    },
    {
      title: "LCL Consolidation",
      icon: TbPackages,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      items: [
        "Groupage services for export",
        "Multiple consignments in single container",
        "Cost-effective for small shippers",
        "Regular consolidation schedules",
      ],
    },
    {
      title: "LCL Deconsolidation",
      icon: TbPackageImport,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      items: [
        "Import LCL cargo separation",
        "Individual consignee delivery arrangement",
        "Cargo storage until pickup",
        "Delivery order processing",
      ],
    },
  ];

  const processSteps = [
    { icon: TbContainer, label: "Container Arrival" },
    { icon: TbPackageExport, label: "De-stuffing" },
    { icon: TbClipboardList, label: "Inspection" },
    { icon: TbArrowsExchange, label: "Segregation" },
    { icon: TbFileCheck, label: "Documentation" },
    { icon: TbTruckDelivery, label: "Delivery" },
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

      // Info box animation
      gsap.fromTo(
        infoRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icon = card.querySelector(".card-icon");
        const items = card.querySelectorAll(".cfs-list-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.15,
            ease: "power3.out",
          }
        )
          .fromTo(
            icon,
            { scale: 0, rotation: -45 },
            { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.3"
          )
          .fromTo(
            items,
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.2"
          );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
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
            <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center">
              <TbContainer className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-purple-600 uppercase tracking-wider">
                Container Freight Station
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                CFS Operations
              </h2>
            </div>
          </div>
        </div>

        {/* What is CFS Info Box */}
        <div
          ref={infoRef}
          className="bg-purple-50 rounded-2xl p-8 mb-12 border border-purple-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <TbFileDescription className="w-4 h-4 text-white" />
            </span>
            What is CFS?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            A Container Freight Station (CFS) is a specialized facility for the consolidation 
            and deconsolidation of Less than Container Load (LCL) cargo. It serves as a hub for 
            customs examination, cargo clearance, and temporary storage before final delivery. 
            Our CFS operations streamline the handling of grouped shipments, ensuring efficient 
            processing and cost savings for shippers with smaller cargo volumes.
          </p>
        </div>

        {/* Process Flow */}
        <div className="mb-16">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
            CFS Process Flow
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-2">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === processSteps.length - 1;
              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                      <Icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 text-center">
                      {step.label}
                    </span>
                  </div>
                  {!isLast && (
                    <div className="hidden md:flex items-center px-2">
                      <div className="w-8 h-0.5 bg-purple-200" />
                      <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-purple-300" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* CFS Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cfsServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div
                  className={`card-icon w-16 h-16 ${service.lightColor} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-8 h-8 ${service.color.replace("bg-", "text-")}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                {/* Items */}
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="cfs-list-item flex items-start gap-3 text-gray-600 text-sm"
                    >
                      <span
                        className={`w-1.5 h-1.5 ${service.color} rounded-full mt-2 shrink-0`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CFSOperations;
