import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbPlane, TbWorld, TbPackage } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const AirlinePartners = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const airlines = [
    {
      name: "Emirates SkyCargo",
      country: "UAE",
      hub: "Dubai (DXB)",
      color: "#D71920",
      destinations: "140+ destinations",
      specialty: "Premium air freight hub",
    },
    {
      name: "Qatar Airways Cargo",
      country: "Qatar",
      hub: "Doha (DOH)",
      color: "#5C0632",
      destinations: "160+ destinations",
      specialty: "Award-winning cargo service",
    },
    {
      name: "Singapore Airlines Cargo",
      country: "Singapore",
      hub: "Singapore (SIN)",
      color: "#1A3C8C",
      destinations: "130+ destinations",
      specialty: "Asia-Pacific hub excellence",
    },
    {
      name: "Turkish Cargo",
      country: "Turkey",
      hub: "Istanbul (IST)",
      color: "#C70A0A",
      destinations: "340+ destinations",
      specialty: "Europe-Asia bridge",
    },
    {
      name: "Cathay Pacific Cargo",
      country: "Hong Kong",
      hub: "Hong Kong (HKG)",
      color: "#006564",
      destinations: "100+ destinations",
      specialty: "Asia cargo leader",
    },
    {
      name: "Etihad Cargo",
      country: "UAE",
      hub: "Abu Dhabi (AUH)",
      color: "#BD8B13",
      destinations: "70+ destinations",
      specialty: "Middle East premium",
    },
    {
      name: "Korean Air Cargo",
      country: "South Korea",
      hub: "Seoul (ICN)",
      color: "#0064D2",
      destinations: "120+ destinations",
      specialty: "Top 5 cargo carrier",
    },
    {
      name: "Lufthansa Cargo",
      country: "Germany",
      hub: "Frankfurt (FRA)",
      color: "#05164D",
      destinations: "300+ destinations",
      specialty: "European excellence",
    },
    {
      name: "British Airways World Cargo",
      country: "UK",
      hub: "London (LHR)",
      color: "#2E5BAD",
      destinations: "200+ destinations",
      specialty: "Global reach",
    },
    {
      name: "Air France Cargo",
      country: "France",
      hub: "Paris (CDG)",
      color: "#002157",
      destinations: "170+ destinations",
      specialty: "European network",
    },
    {
      name: "Biman Bangladesh Cargo",
      country: "Bangladesh",
      hub: "Dhaka (DAC)",
      color: "#006747",
      destinations: "40+ destinations",
      specialty: "National carrier",
    },
    {
      name: "FedEx Express",
      country: "USA",
      hub: "Memphis (MEM)",
      color: "#4D148C",
      destinations: "220+ countries",
      specialty: "Express specialist",
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

      // Cards animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll(".airline-card"),
          { y: 30, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
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
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbPlane className="w-4 h-4" />
            Airline Partners
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Global Airline Cargo Partners
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Connected with leading airlines worldwide for fast and reliable 
            air freight solutions to any destination.
          </p>
        </div>

        {/* Airlines Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {airlines.map((airline, index) => (
            <div
              key={index}
              className="airline-card"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative bg-white rounded-2xl p-5 border transition-all duration-300 h-full cursor-pointer overflow-hidden
                  ${hoveredIndex === index 
                    ? "shadow-xl border-gray-200 -translate-y-1" 
                    : "border-gray-100 hover:border-gray-200"}`}
              >
                {/* Decorative Background */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full transition-all duration-500 -translate-y-1/2 translate-x-1/2`}
                  style={{
                    backgroundColor: airline.color,
                    opacity: hoveredIndex === index ? 0.1 : 0.05,
                  }}
                />

                {/* Plane Icon */}
                <div className="relative mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: hoveredIndex === index ? airline.color : "#f3f4f6",
                    }}
                  >
                    <TbPlane
                      className={`w-7 h-7 transition-all duration-300 ${
                        hoveredIndex === index ? "text-white rotate-12" : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Airline Info */}
                <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight">
                  {airline.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{airline.country}</p>

                {/* Hub Info */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                  <TbWorld className="w-3 h-3 shrink-0" style={{ color: airline.color }} />
                  <span>Hub: {airline.hub}</span>
                </div>

                {/* Destinations */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <TbPackage className="w-3 h-3 shrink-0" style={{ color: airline.color }} />
                  <span>{airline.destinations}</span>
                </div>

                {/* Specialty on hover */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    hoveredIndex === index ? "max-h-20 opacity-100 mt-3 pt-3 border-t border-gray-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs text-gray-500">{airline.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Strip */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: TbPlane, label: "Express Delivery", value: "1-3 Days" },
              { icon: TbWorld, label: "Global Coverage", value: "200+ Countries" },
              { icon: TbPackage, label: "Cargo Types", value: "All Categories" },
              { icon: TbPlane, label: "Charter Service", value: "On Demand" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto bg-orange-50 rounded-xl flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">{item.value}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirlinePartners;
