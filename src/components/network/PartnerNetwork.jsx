import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbWorld,
  TbMapPin,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const PartnerNetwork = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(0);

  const regions = [
    {
      id: "asia",
      name: "Asia Pacific",
      color: "orange",
      countries: [
        { name: "China", cities: ["Shanghai", "Shenzhen", "Guangzhou", "Beijing"] },
        { name: "Singapore", cities: ["Singapore"] },
        { name: "Hong Kong", cities: ["Hong Kong"] },
        { name: "Thailand", cities: ["Bangkok"] },
        { name: "Malaysia", cities: ["Kuala Lumpur", "Port Klang"] },
        { name: "Vietnam", cities: ["Ho Chi Minh", "Hanoi"] },
        { name: "India", cities: ["Mumbai", "Delhi", "Chennai", "Kolkata"] },
        { name: "Pakistan", cities: ["Karachi", "Lahore"] },
        { name: "Sri Lanka", cities: ["Colombo"] },
        { name: "Japan", cities: ["Tokyo", "Osaka"] },
        { name: "South Korea", cities: ["Seoul", "Busan"] },
      ],
    },
    {
      id: "middleeast",
      name: "Middle East",
      color: "emerald",
      countries: [
        { name: "UAE", cities: ["Dubai", "Abu Dhabi"] },
        { name: "Saudi Arabia", cities: ["Jeddah", "Riyadh", "Dammam"] },
        { name: "Qatar", cities: ["Doha"] },
        { name: "Kuwait", cities: ["Kuwait City"] },
        { name: "Oman", cities: ["Muscat"] },
        { name: "Bahrain", cities: ["Manama"] },
      ],
    },
    {
      id: "europe",
      name: "Europe",
      color: "blue",
      countries: [
        { name: "UK", cities: ["London", "Felixstowe", "Manchester"] },
        { name: "Germany", cities: ["Hamburg", "Bremen", "Frankfurt"] },
        { name: "Netherlands", cities: ["Rotterdam", "Amsterdam"] },
        { name: "Belgium", cities: ["Antwerp"] },
        { name: "France", cities: ["Le Havre", "Paris"] },
        { name: "Italy", cities: ["Genoa", "Milan"] },
        { name: "Spain", cities: ["Barcelona", "Valencia"] },
        { name: "Turkey", cities: ["Istanbul"] },
      ],
    },
    {
      id: "americas",
      name: "Americas",
      color: "purple",
      countries: [
        { name: "USA", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"] },
        { name: "Canada", cities: ["Toronto", "Vancouver", "Montreal"] },
      ],
    },
    {
      id: "africa",
      name: "Africa",
      color: "rose",
      countries: [
        { name: "South Africa", cities: ["Durban", "Cape Town"] },
        { name: "Kenya", cities: ["Nairobi", "Mombasa"] },
        { name: "Egypt", cities: ["Alexandria", "Cairo"] },
      ],
    },
  ];

  const colorClasses = {
    orange: { bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-500", border: "border-orange-200" },
    emerald: { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-200" },
    blue: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-500", border: "border-blue-200" },
    purple: { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-500", border: "border-purple-200" },
    rose: { bg: "bg-rose-500", light: "bg-rose-50", text: "text-rose-500", border: "border-rose-200" },
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
        gsap.fromTo(
          tabsRef.current.querySelectorAll(".region-tab"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
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
      const countries = contentRef.current.querySelectorAll(".country-card");
      gsap.fromTo(
        countries,
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    }
  }, [activeRegion]);

  const activeData = regions[activeRegion];
  const colors = colorClasses[activeData.color];

  return (
    <section ref={sectionRef} id="partners" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbWorld className="w-4 h-4" />
            International Network
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Agent Partners by Region
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Our trusted network of partner agents provides seamless logistics 
            solutions across the globe.
          </p>
        </div>

        {/* Region Tabs */}
        <div
          ref={tabsRef}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
        >
          {regions.map((region, index) => {
            const isActive = activeRegion === index;
            const tabColors = colorClasses[region.color];
            return (
              <button
                key={region.id}
                onClick={() => setActiveRegion(index)}
                className={`region-tab px-4 md:px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? `${tabColors.bg} text-white shadow-lg`
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {region.name}
              </button>
            );
          })}
        </div>

        {/* Countries Grid */}
        <div
          ref={contentRef}
          className={`bg-white rounded-3xl p-6 md:p-10 border ${colors.border}`}
        >
          {/* Region Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className={`w-14 h-14 ${colors.light} rounded-2xl flex items-center justify-center`}>
              <TbWorld className={`w-7 h-7 ${colors.text}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{activeData.name}</h3>
              <p className="text-gray-500">
                {activeData.countries.length} countries • {activeData.countries.reduce((acc, c) => acc + c.cities.length, 0)} cities
              </p>
            </div>
          </div>

          {/* Countries */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeData.countries.map((country, index) => (
              <div
                key={index}
                className={`country-card p-4 bg-gray-50 hover:bg-white border border-gray-100 hover:${colors.border} rounded-xl transition-all duration-300 cursor-pointer group hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TbMapPin className={`w-4 h-4 ${colors.text}`} />
                    <h4 className="font-semibold text-gray-900 group-hover:text-gray-800">
                      {country.name}
                    </h4>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-500">
                    {country.cities.length} cities
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {country.cities.map((city, cIndex) => (
                    <span
                      key={cIndex}
                      className={`px-2 py-0.5 ${colors.light} ${colors.text} text-xs rounded-md`}
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-500">
              Looking for a specific destination?
            </p>
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 ${colors.text} font-medium hover:gap-3 transition-all duration-300`}
            >
              Contact Us
              <TbArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerNetwork;
