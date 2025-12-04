import React, { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";

gsap.registerPlugin(ScrollTrigger);

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const regions = [
  {
    id: "north-america",
    name: "North America",
    coordinates: [-100, 45],
    countries: ["USA", "CAN", "MEX"],
    capabilities: ["Major Port Access", "Cross-border Logistics", "E-commerce Fulfillment"],
    ports: 12,
    partners: 45,
    color: "#3B82F6",
  },
  {
    id: "south-america",
    name: "South America",
    coordinates: [-60, -15],
    countries: ["BRA", "ARG", "CHL", "COL", "PER"],
    capabilities: ["Agricultural Exports", "Mining Logistics", "Coastal Shipping"],
    ports: 8,
    partners: 28,
    color: "#10B981",
  },
  {
    id: "europe",
    name: "Europe",
    coordinates: [10, 50],
    countries: ["DEU", "FRA", "GBR", "ITA", "ESP", "NLD", "POL"],
    capabilities: ["EU Trade Compliance", "Rail Freight Network", "Cold Chain Solutions"],
    ports: 18,
    partners: 67,
    color: "#8B5CF6",
  },
  {
    id: "africa",
    name: "Africa",
    coordinates: [20, 0],
    countries: ["ZAF", "EGY", "NGA", "KEN", "MAR"],
    capabilities: ["Emerging Markets", "Resource Logistics", "Port Development"],
    ports: 10,
    partners: 32,
    color: "#F59E0B",
  },
  {
    id: "middle-east",
    name: "Middle East",
    coordinates: [50, 25],
    countries: ["SAU", "ARE", "QAT", "KWT", "OMN"],
    capabilities: ["Oil & Gas Logistics", "Free Trade Zones", "Air Cargo Hub"],
    ports: 7,
    partners: 24,
    color: "#EF4444",
  },
  {
    id: "asia",
    name: "Asia Pacific",
    coordinates: [105, 35],
    countries: ["CHN", "JPN", "KOR", "IND", "SGP", "THA", "VNM", "MYS"],
    capabilities: ["Manufacturing Hub", "Tech Supply Chain", "High-Volume Shipping"],
    ports: 25,
    partners: 89,
    color: "#06B6D4",
  },
  {
    id: "oceania",
    name: "Oceania",
    coordinates: [135, -25],
    countries: ["AUS", "NZL"],
    capabilities: ["Trans-Pacific Routes", "Agricultural Exports", "Island Logistics"],
    ports: 6,
    partners: 18,
    color: "#EC4899",
  },
];

const tradeRoutes = [
  { from: [-100, 45], to: [10, 50], name: "NA-EU" },
  { from: [-100, 45], to: [105, 35], name: "NA-Asia" },
  { from: [10, 50], to: [105, 35], name: "EU-Asia" },
  { from: [10, 50], to: [50, 25], name: "EU-ME" },
  { from: [50, 25], to: [105, 35], name: "ME-Asia" },
  { from: [105, 35], to: [135, -25], name: "Asia-Oceania" },
  { from: [-60, -15], to: [20, 0], name: "SA-Africa" },
  { from: [-100, 45], to: [-60, -15], name: "NA-SA" },
  { from: [10, 50], to: [20, 0], name: "EU-Africa" },
];

const RegionInfo = ({ region }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (region) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 30, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [region]);

  if (!region) return null;

  return (
    <div
      ref={cardRef}
      className="absolute right-6 top-1/2 -translate-y-1/2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20"
    >
      {/* Header */}
      <div className="p-5" style={{ backgroundColor: region.color + "15" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: region.color }}
          />
          <h3 className="text-lg font-bold text-gray-900">{region.name}</h3>
        </div>
      </div>

      {/* Stats */}
      <div className="p-5 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4">
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
      </div>

      {/* Capabilities */}
      <div className="p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
          Capabilities
        </p>
        <div className="space-y-2">
          {region.capabilities.map((cap, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: region.color }}
              />
              {cap}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <button
          className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: region.color }}
        >
          Explore {region.name}
        </button>
      </div>
    </div>
  );
};

const MapChart = memo(({ activeRegion, setActiveRegion }) => {
  const getRegionByCountry = (countryCode) => {
    return regions.find((r) => r.countries.includes(countryCode));
  };

  const getCountryColor = (geo) => {
    const countryCode = geo.properties.ISO_A3 || geo.properties.ADM0_A3;
    const region = getRegionByCountry(countryCode);
    
    if (region) {
      if (activeRegion?.id === region.id) {
        return region.color;
      }
      return region.color + "40";
    }
    return "#E2E8F0";
  };

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 130,
        center: [20, 20],
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Trade Routes */}
      {tradeRoutes.map((route, i) => (
        <Line
          key={i}
          from={route.from}
          to={route.to}
          stroke={activeRegion ? "#3B82F6" : "#94A3B8"}
          strokeWidth={activeRegion ? 1.5 : 0.8}
          strokeLinecap="round"
          strokeDasharray="5,5"
          style={{
            opacity: activeRegion ? 0.8 : 0.3,
            transition: "all 0.3s ease",
          }}
        />
      ))}

      {/* Countries */}
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryCode = geo.properties.ISO_A3 || geo.properties.ADM0_A3;
            const region = getRegionByCountry(countryCode);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getCountryColor(geo)}
                stroke="#FFF"
                strokeWidth={0.5}
                style={{
                  default: {
                    outline: "none",
                    transition: "all 0.3s ease",
                  },
                  hover: {
                    fill: region ? region.color : "#CBD5E1",
                    outline: "none",
                    cursor: region ? "pointer" : "default",
                  },
                  pressed: {
                    outline: "none",
                  },
                }}
                onMouseEnter={() => {
                  if (region) setActiveRegion(region);
                }}
                onMouseLeave={() => setActiveRegion(null)}
              />
            );
          })
        }
      </Geographies>

      {/* Region Markers */}
      {regions.map((region) => (
        <Marker
          key={region.id}
          coordinates={region.coordinates}
          onMouseEnter={() => setActiveRegion(region)}
          onMouseLeave={() => setActiveRegion(null)}
        >
          {/* Pulse ring */}
          <circle
            r={activeRegion?.id === region.id ? 12 : 8}
            fill={region.color}
            opacity={0.2}
            style={{ transition: "all 0.3s ease" }}
          />
          {/* Main dot */}
          <circle
            r={activeRegion?.id === region.id ? 6 : 4}
            fill={region.color}
            stroke="#FFF"
            strokeWidth={2}
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              filter: activeRegion?.id === region.id ? `drop-shadow(0 0 8px ${region.color})` : "none",
            }}
          />
          {/* Label */}
          {activeRegion?.id === region.id && (
            <text
              textAnchor="middle"
              y={-15}
              style={{
                fontFamily: "system-ui",
                fontSize: "10px",
                fontWeight: "600",
                fill: region.color,
              }}
            >
              {region.name}
            </text>
          )}
        </Marker>
      ))}
    </ComposableMap>
  );
});

MapChart.displayName = "MapChart";

const GlobalNetworkMap = () => {
  const [activeRegion, setActiveRegion] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const container = containerRef.current;

    gsap.set(title, { opacity: 0, y: 40 });
    gsap.set(subtitle, { opacity: 0, y: 30 });
    gsap.set(container, { opacity: 0, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        container,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gray-50 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
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
          ref={containerRef}
          className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          style={{ height: "550px" }}
        >
          {/* Map */}
          <div className="absolute inset-0">
            <MapChart
              activeRegion={activeRegion}
              setActiveRegion={setActiveRegion}
            />
          </div>

          {/* Region info card */}
          <RegionInfo region={activeRegion} />

          {/* Legend */}
          <div className="absolute bottom-6 left-6 flex items-center gap-6 bg-white/90 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-600">Regional Hubs</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-0.5"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #94A3B8 0px, #94A3B8 4px, transparent 4px, transparent 8px)",
                }}
              />
              <span className="text-xs text-gray-600">Trade Routes</span>
            </div>
          </div>

          {/* Hover instruction */}
          <div
            className={`absolute top-6 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full transition-all duration-500 ${
              activeRegion
                ? "opacity-0 -translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            Hover over a region to explore capabilities
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "50+", label: "Countries", color: "#3B82F6" },
            { value: "86", label: "Active Ports", color: "#10B981" },
            { value: "303", label: "Global Partners", color: "#8B5CF6" },
            { value: "24/7", label: "Operations", color: "#F59E0B" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <p
                className="text-3xl font-bold mb-1"
                style={{ color: stat.color }}
              >
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
