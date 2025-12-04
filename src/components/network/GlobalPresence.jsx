import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbWorld,
  TbMapPin,
  TbUsers,
  TbShip,
  TbCalendar,
  TbPlane,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const GlobalPresence = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const mapRef = useRef(null);
  const statsRef = useRef([]);
  const regionsRef = useRef([]);
  const [activeRegion, setActiveRegion] = useState(null);

  const stats = [
    { icon: TbWorld, value: "100+", label: "Countries Covered", color: "orange" },
    { icon: TbUsers, value: "200+", label: "Partner Agents", color: "blue" },
    { icon: TbShip, value: "500+", label: "Major Ports Connected", color: "emerald" },
    { icon: TbCalendar, value: "50+", label: "Weekly Schedules", color: "purple" },
  ];

  const regions = [
    { id: "asia", name: "Asia Pacific", countries: 25, top: "35%", left: "65%", size: "lg" },
    { id: "middleeast", name: "Middle East", countries: 12, top: "40%", left: "48%", size: "md" },
    { id: "europe", name: "Europe", countries: 20, top: "25%", left: "42%", size: "lg" },
    { id: "americas", name: "Americas", countries: 15, top: "40%", left: "18%", size: "lg" },
    { id: "africa", name: "Africa", countries: 10, top: "55%", left: "42%", size: "md" },
  ];

  const colorClasses = {
    orange: { bg: "bg-orange-50", icon: "text-orange-500", border: "border-orange-200" },
    blue: { bg: "bg-blue-50", icon: "text-blue-500", border: "border-blue-200" },
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-500", border: "border-emerald-200" },
    purple: { bg: "bg-purple-50", icon: "text-purple-500", border: "border-purple-200" },
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

      // Map animation
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Region pins animation
        regionsRef.current.forEach((region, index) => {
          if (!region) return;
          gsap.fromTo(
            region,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              delay: 0.3 + index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: mapRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Pulse animation
          gsap.to(region.querySelector(".pulse-ring"), {
            scale: 1.5,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: "power2.out",
            delay: index * 0.2,
          });
        });
      }

      // Stats animation
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stat,
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbWorld className="w-4 h-4" />
            Global Presence
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Worldwide Coverage
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Strategic locations and trusted partners across the globe, 
            ensuring seamless logistics solutions wherever you need them.
          </p>
        </div>

        {/* Interactive World Map */}
        <div
          ref={mapRef}
          className="relative bg-gray-50 rounded-3xl p-6 md:p-10 border border-gray-100 mb-12 overflow-hidden"
        >
          {/* Map Background */}
          <div className="relative aspect-2/1 min-h-[300px] md:min-h-[400px]">
            {/* Simplified World Map SVG */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Continents - Simplified shapes */}
              {/* North America */}
              <path
                d="M50 100 Q100 80 180 90 Q220 100 250 150 Q260 200 240 250 Q200 280 150 270 Q100 260 80 220 Q60 180 50 100Z"
                fill="#e5e7eb"
                className="transition-colors duration-300 hover:fill-orange-100"
              />
              {/* South America */}
              <path
                d="M180 280 Q220 270 240 300 Q260 350 250 420 Q230 470 190 480 Q150 470 140 420 Q130 360 150 300 Q160 280 180 280Z"
                fill="#e5e7eb"
                className="transition-colors duration-300 hover:fill-orange-100"
              />
              {/* Europe */}
              <path
                d="M400 80 Q450 70 500 80 Q540 100 530 140 Q520 170 480 180 Q440 185 410 170 Q380 150 390 110 Q395 85 400 80Z"
                fill="#e5e7eb"
                className="transition-colors duration-300 hover:fill-orange-100"
              />
              {/* Africa */}
              <path
                d="M420 200 Q470 190 510 210 Q550 250 560 320 Q550 400 500 440 Q450 460 400 440 Q360 400 370 320 Q380 250 420 200Z"
                fill="#e5e7eb"
                className="transition-colors duration-300 hover:fill-orange-100"
              />
              {/* Asia */}
              <path
                d="M550 60 Q650 50 750 80 Q850 120 900 180 Q930 250 900 320 Q850 370 750 350 Q650 340 580 280 Q530 220 540 150 Q545 100 550 60Z"
                fill="#e5e7eb"
                className="transition-colors duration-300 hover:fill-orange-100"
              />
              {/* Australia */}
              <path
                d="M800 350 Q850 340 880 370 Q910 410 900 450 Q870 480 820 475 Q770 460 770 410 Q775 370 800 350Z"
                fill="#e5e7eb"
                className="transition-colors duration-300 hover:fill-orange-100"
              />

              {/* Trade Routes */}
              <path
                d="M200 200 Q350 150 480 160"
                stroke="#f97316"
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity="0.5"
              />
              <path
                d="M480 160 Q600 140 750 180"
                stroke="#f97316"
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity="0.5"
              />
              <path
                d="M480 200 Q520 280 480 350"
                stroke="#f97316"
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity="0.5"
              />
              <path
                d="M750 200 Q800 280 850 380"
                stroke="#f97316"
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity="0.5"
              />
            </svg>

            {/* Region Pins */}
            {regions.map((region, index) => (
              <div
                key={region.id}
                ref={(el) => (regionsRef.current[index] = el)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: region.top, left: region.left }}
                onMouseEnter={() => setActiveRegion(region.id)}
                onMouseLeave={() => setActiveRegion(null)}
              >
                {/* Pulse Ring */}
                <div className="pulse-ring absolute inset-0 w-8 h-8 md:w-10 md:h-10 bg-orange-400 rounded-full opacity-50" />
                
                {/* Pin */}
                <div
                  className={`relative w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                    region.size === "lg" ? "md:w-12 md:h-12" : ""
                  }`}
                >
                  <TbMapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>

                {/* Tooltip */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 ${
                    activeRegion === region.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="font-semibold">{region.name}</div>
                  <div className="text-xs text-gray-300">{region.countries} countries</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
              </div>
            ))}

            {/* Bangladesh Highlight */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: "42%", left: "70%" }}
            >
              <div className="relative">
                <div className="absolute inset-0 w-6 h-6 bg-emerald-400 rounded-full animate-ping opacity-50" />
                <div className="relative w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">BD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full" />
              <span className="text-sm text-gray-600">Partner Regions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full" />
              <span className="text-sm text-gray-600">Head Office (Bangladesh)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-orange-400" />
              <span className="text-sm text-gray-600">Major Trade Routes</span>
            </div>
          </div>
        </div>

        {/* Coverage Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = colorClasses[stat.color];
            return (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className={`bg-white border ${colors.border} rounded-2xl p-5 md:p-6 hover:shadow-lg transition-shadow duration-300`}
              >
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
