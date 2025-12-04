import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbRocket,
  TbPackages,
  TbAlertTriangle,
  TbSnowflake,
  TbPlane,
  TbTruckDelivery,
  TbCheck,
  TbClock,
  TbShieldCheck,
  TbChartLine,
  TbWorld,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const AirFreightSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const partnersRef = useRef(null);
  const destinationsRef = useRef(null);
  const benefitsRef = useRef([]);

  const airServices = [
    {
      icon: TbRocket,
      title: "Express Air Cargo",
      description: "Priority delivery for urgent shipments with guaranteed transit times",
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
    },
    {
      icon: TbPackages,
      title: "Consolidated Air Freight",
      description: "Cost-effective LCL air shipments through consolidation services",
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
    },
    {
      icon: TbAlertTriangle,
      title: "Dangerous Goods Shipping",
      description: "IATA DGR certified handling for hazardous materials",
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
    },
    {
      icon: TbSnowflake,
      title: "Perishable Cargo",
      description: "Temperature-controlled solutions for sensitive goods",
      color: "bg-cyan-500",
      lightColor: "bg-cyan-50",
    },
    {
      icon: TbPlane,
      title: "Charter Services",
      description: "Dedicated aircraft for large or urgent shipments",
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
    },
    {
      icon: TbTruckDelivery,
      title: "Door-to-Door Delivery",
      description: "Complete logistics coverage from origin to destination",
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
    },
  ];

  const partnerAirlines = [
    "Emirates SkyCargo",
    "Qatar Airways Cargo",
    "Singapore Airlines Cargo",
    "Turkish Cargo",
    "Cathay Pacific Cargo",
    "Lufthansa Cargo",
  ];

  const keyDestinations = [
    { region: "USA", cities: "New York, Los Angeles, Chicago" },
    { region: "Europe", cities: "London, Frankfurt, Paris" },
    { region: "Middle East", cities: "Dubai, Doha, Riyadh" },
    { region: "Asia Pacific", cities: "Singapore, Hong Kong, Tokyo" },
    { region: "China", cities: "Shanghai, Guangzhou, Beijing" },
    { region: "Australia", cities: "Sydney, Melbourne, Brisbane" },
  ];

  const benefits = [
    { icon: TbClock, text: "Fastest transit times" },
    { icon: TbShieldCheck, text: "High security for valuable cargo" },
    { icon: TbChartLine, text: "Reduced inventory holding costs" },
    { icon: TbWorld, text: "Global tracking capabilities" },
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

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const icon = card.querySelector(".card-icon");

        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Icon animation
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -90 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.1 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.2, rotation: 10, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      // Partners animation
      gsap.fromTo(
        partnersRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: partnersRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Destinations animation
      gsap.fromTo(
        destinationsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: destinationsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Benefits animation
      benefitsRef.current.forEach((benefit, index) => {
        if (!benefit) return;
        gsap.fromTo(
          benefit,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: benefit,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center">
              <TbPlane className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                Air Freight
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Air Freight Services
              </h2>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl text-lg">
            When time is critical, our air freight solutions deliver. Ideal for time-sensitive cargo, 
            high-value goods, and perishables requiring the fastest transit times.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {airServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`card-icon w-14 h-14 ${service.lightColor} rounded-xl flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-7 h-7 ${service.color.replace("bg-", "text-")}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Partners & Destinations */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Partner Airlines */}
          <div ref={partnersRef} className="bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Partner Airlines
            </h3>
            <div className="flex flex-wrap gap-3">
              {partnerAirlines.map((airline, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300"
                >
                  {airline}
                </span>
              ))}
            </div>
          </div>

          {/* Key Destinations */}
          <div ref={destinationsRef} className="bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              Key Destinations
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {keyDestinations.map((dest, index) => (
                <div key={index} className="group">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {dest.region}
                  </div>
                  <div className="text-sm text-gray-500">{dest.cities}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-blue-500 rounded-2xl p-8 md:p-10">
          <h3 className="text-xl font-bold text-white mb-8">
            Why Choose Air Freight?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (benefitsRef.current[index] = el)}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirFreightSection;
