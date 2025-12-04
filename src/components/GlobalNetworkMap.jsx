import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbMapPin, TbAnchor, TbUsers, TbWorld } from "react-icons/tb";
import WorldMapSVG from "../assets/world.svg?react";

gsap.registerPlugin(ScrollTrigger);

// Define regions with their countries and data
const regions = [
  {
    id: "north-america",
    name: "North America",
    countries: ["US", "CA", "MX"],
    capabilities: ["Major Port Access", "Cross-border Logistics", "E-commerce Fulfillment"],
    ports: 12,
    partners: 45,
    color: "#3B82F6",
    position: { x: 180, y: 230 },
  },
  {
    id: "south-america",
    name: "South America",
    countries: ["BR", "AR", "CL", "CO", "PE", "VE", "EC", "BO", "PY", "UY", "GY", "SR"],
    capabilities: ["Agricultural Exports", "Mining Logistics", "Coastal Shipping"],
    ports: 8,
    partners: 28,
    color: "#10B981",
    position: { x: 290, y: 450 },
  },
  {
    id: "europe",
    name: "Europe",
    countries: ["GB", "DE", "FR", "IT", "ES", "NL", "BE", "PT", "PL", "SE", "NO", "FI", "DK", "AT", "CH", "IE", "GR", "CZ", "RO", "HU", "UA", "BY", "RS", "HR", "SK", "BG"],
    capabilities: ["EU Trade Compliance", "Rail Freight Network", "Cold Chain Solutions"],
    ports: 18,
    partners: 67,
    color: "#8B5CF6",
    position: { x: 505, y: 175 },
  },
  {
    id: "africa",
    name: "Africa",
    countries: ["ZA", "EG", "NG", "KE", "MA", "GH", "TZ", "ET", "CI", "CM", "SN", "AO", "DZ", "LY", "SD", "CD", "ZM", "ZW", "MZ", "MW", "UG", "MG"],
    capabilities: ["Emerging Markets", "Resource Logistics", "Port Development"],
    ports: 10,
    partners: 32,
    color: "#F59E0B",
    position: { x: 520, y: 380 },
  },
  {
    id: "middle-east",
    name: "Middle East",
    countries: ["AE", "SA", "QA", "KW", "OM", "BH", "IL", "JO", "LB", "IQ", "IR", "SY", "YE", "TR"],
    capabilities: ["Oil & Gas Logistics", "Free Trade Zones", "Air Cargo Hub"],
    ports: 7,
    partners: 24,
    color: "#EF4444",
    position: { x: 610, y: 280 },
  },
  {
    id: "asia",
    name: "Asia Pacific",
    countries: ["CN", "JP", "KR", "IN", "SG", "TH", "VN", "MY", "ID", "PH", "TW", "HK", "BD", "PK", "MM", "KH", "LA", "NP", "LK", "MN", "KZ", "UZ"],
    capabilities: ["Manufacturing Hub", "Tech Supply Chain", "High-Volume Shipping"],
    ports: 25,
    partners: 89,
    color: "#06B6D4",
    position: { x: 780, y: 260 },
  },
  {
    id: "oceania",
    name: "Oceania",
    countries: ["AU", "NZ", "FJ", "PG", "NC"],
    capabilities: ["Trans-Pacific Routes", "Agricultural Exports", "Island Logistics"],
    ports: 6,
    partners: 18,
    color: "#EC4899",
    position: { x: 890, y: 480 },
  },
];

// Get region by country code
const getRegionByCountry = (countryId) => {
  return regions.find(r => r.countries.includes(countryId));
};

// Tooltip component
const RegionTooltip = ({ region, mousePos }) => {
  if (!region) return null;

  return (
    <div
      className="fixed z-50 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden pointer-events-none transform -translate-x-1/2 -translate-y-full"
      style={{ 
        left: mousePos.x, 
        top: mousePos.y - 15,
      }}
    >
      <div className="p-4" style={{ backgroundColor: region.color + "15" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: region.color }}
          />
          <h3 className="font-bold text-gray-900 text-lg">{region.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold" style={{ color: region.color }}>
              {region.ports}
            </p>
            <p className="text-xs text-gray-500">Active Ports</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: region.color }}>
              {region.partners}
            </p>
            <p className="text-xs text-gray-500">Partners</p>
          </div>
        </div>
        <div className="space-y-2">
          {region.capabilities.map((cap, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: region.color }}
              />
              {cap}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GlobalNetworkMap = () => {
  const [activeRegion, setActiveRegion] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // Handle country hover - find region and highlight
  const handleCountryEnter = useCallback((countryId) => {
    const region = getRegionByCountry(countryId);
    if (region) {
      setActiveRegion(region);
    }
  }, []);

  const handleCountryLeave = useCallback(() => {
    setActiveRegion(null);
  }, []);

  // Apply interactive styles to map countries
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const svg = mapContainerRef.current.querySelector('svg');
    if (!svg) return;

    // Get all path elements (countries)
    const paths = svg.querySelectorAll('path');
    
    paths.forEach(path => {
      const countryId = path.getAttribute('id');
      
      // Style the path
      path.style.fill = '#cbd5e1';
      path.style.stroke = '#94a3b8';
      path.style.strokeWidth = '0.5';
      path.style.transition = 'fill 0.3s ease, transform 0.2s ease';
      path.style.cursor = 'pointer';
      
      // Check if this country belongs to a region
      const region = getRegionByCountry(countryId);
      
      if (region) {
        path.addEventListener('mouseenter', () => {
          // Highlight all countries in this region
          region.countries.forEach(id => {
            const countryPath = svg.querySelector(`#${id}`);
            if (countryPath) {
              countryPath.style.fill = region.color;
            }
          });
          handleCountryEnter(countryId);
        });
        
        path.addEventListener('mouseleave', () => {
          // Reset all countries in this region
          region.countries.forEach(id => {
            const countryPath = svg.querySelector(`#${id}`);
            if (countryPath) {
              countryPath.style.fill = '#cbd5e1';
            }
          });
          handleCountryLeave();
        });
      }
    });

    // Cleanup
    return () => {
      paths.forEach(path => {
        path.replaceWith(path.cloneNode(true));
      });
    };
  }, [handleCountryEnter, handleCountryLeave]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Map container animation
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate markers with stagger
      markersRef.current.forEach((marker, i) => {
        if (marker) {
          gsap.fromTo(
            marker,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              delay: 0.8 + i * 0.1,
              ease: "back.out(1.7)",
              transformOrigin: "center center",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Global Network
          </h2>
          <p
            ref={subtitleRef}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Connecting continents through strategic partnerships and
            comprehensive port coverage across 50+ countries.
          </p>
        </div>

        {/* Map Container */}
        <div 
          ref={mapRef} 
          className="relative bg-linear-to-b from-slate-100 to-white rounded-3xl p-4 md:p-8 border border-gray-100 shadow-sm"
          onMouseMove={handleMouseMove}
        >
          {/* SVG Container with World Map and Overlays */}
          <div className="relative w-full" style={{ aspectRatio: "1009.6727 / 665.963" }}>
            {/* Base World Map */}
            <div 
              ref={mapContainerRef}
              className="absolute inset-0 w-full h-full [&_svg]:w-full [&_svg]:h-full"
            >
              <WorldMapSVG />
            </div>

            {/* Region Markers Overlay */}
            <svg 
              viewBox="0 0 1009.6727 665.96301" 
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 20 }}
            >
              <defs>
                <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {regions.map((region, i) => {
                const isActive = activeRegion?.id === region.id;
                return (
                  <g
                    key={region.id}
                    ref={(el) => (markersRef.current[i] = el)}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveRegion(region)}
                    onMouseLeave={() => setActiveRegion(null)}
                    style={{ pointerEvents: "auto" }}
                  >
                    {/* Outer pulse ring */}
                    <circle
                      cx={region.position.x}
                      cy={region.position.y}
                      r={isActive ? 25 : 18}
                      fill={region.color}
                      opacity={0.15}
                      className="transition-all duration-300"
                    >
                      <animate
                        attributeName="r"
                        values={isActive ? "25;35;25" : "18;25;18"}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.2;0.05;0.2"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    
                    {/* Inner pulse ring */}
                    <circle
                      cx={region.position.x}
                      cy={region.position.y}
                      r={isActive ? 16 : 12}
                      fill={region.color}
                      opacity={0.25}
                      className="transition-all duration-300"
                    >
                      <animate
                        attributeName="r"
                        values={isActive ? "16;22;16" : "12;16;12"}
                        dur="2s"
                        repeatCount="indefinite"
                        begin="0.5s"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.3;0.1;0.3"
                        dur="2s"
                        repeatCount="indefinite"
                        begin="0.5s"
                      />
                    </circle>
                    
                    {/* Main marker dot */}
                    <circle
                      cx={region.position.x}
                      cy={region.position.y}
                      r={isActive ? 10 : 8}
                      fill={region.color}
                      stroke="#fff"
                      strokeWidth={3}
                      filter={isActive ? "url(#markerGlow)" : "none"}
                      className="transition-all duration-300"
                    />

                    {/* Region label background */}
                    <rect
                      x={region.position.x - 55}
                      y={region.position.y + (isActive ? 18 : 15)}
                      width={110}
                      height={24}
                      rx={12}
                      fill={isActive ? region.color : "white"}
                      stroke={isActive ? region.color : "#e2e8f0"}
                      strokeWidth={1}
                      opacity={isActive ? 1 : 0.9}
                      className="transition-all duration-300"
                    />

                    {/* Region label text */}
                    <text
                      x={region.position.x}
                      y={region.position.y + (isActive ? 35 : 32)}
                      textAnchor="middle"
                      fill={isActive ? "#fff" : "#475569"}
                      fontSize={isActive ? "13" : "12"}
                      fontWeight={isActive ? "600" : "500"}
                      className="transition-all duration-300 pointer-events-none select-none"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {region.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Tooltip */}
          <RegionTooltip region={activeRegion} mousePos={mousePos} />

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-5 mt-8">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full text-sm text-gray-600 border border-gray-200 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Regional Hubs</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full text-sm text-gray-600 border border-gray-200 shadow-sm">
              <div className="w-3 h-3 bg-slate-300 border border-slate-400 rounded-sm" />
              <span>Coverage Areas</span>
            </div>
          </div>

          {/* Hover instruction */}
          <p className="text-center text-gray-400 text-sm mt-5">
            Hover over countries or regional markers to explore our global capabilities
          </p>
        </div>

        {/* Bottom stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: TbWorld, value: "50+", label: "Countries", color: "#3B82F6" },
            { icon: TbAnchor, value: "86", label: "Active Ports", color: "#10B981" },
            { icon: TbUsers, value: "303", label: "Global Partners", color: "#8B5CF6" },
            { icon: TbMapPin, value: "24/7", label: "Operations", color: "#F59E0B" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-5 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: stat.color + "15" }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalNetworkMap;
