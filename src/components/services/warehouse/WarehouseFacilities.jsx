import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbBuildingWarehouse,
  TbMapPin,
  TbRulerMeasure,
  TbPackage,
  TbTemperature,
  TbLock,
  TbAlertTriangle,
  TbContainer,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const WarehouseFacilities = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const locationsRef = useRef([]);
  const storageRef = useRef([]);
  const statsRef = useRef([]);

  const locations = [
    {
      city: "Dhaka",
      area: "Tongi Industrial Area",
      size: "45,000",
      unit: "sq ft",
      features: ["Near DEPZ", "Highway Access", "Rail Connected"],
      color: "bg-blue-500",
    },
    {
      city: "Chittagong",
      area: "Port Area",
      size: "60,000",
      unit: "sq ft",
      features: ["2km from Port", "CFS Integrated", "24/7 Operations"],
      color: "bg-emerald-500",
    },
  ];

  const storageTypes = [
    {
      icon: TbPackage,
      title: "Ambient Storage",
      description: "General cargo, packaged goods, dry commodities",
      color: "bg-gray-700",
      lightColor: "bg-gray-100",
    },
    {
      icon: TbTemperature,
      title: "Temperature-Controlled",
      description: "Pharmaceuticals, perishables, cold chain logistics",
      color: "bg-cyan-500",
      lightColor: "bg-cyan-50",
    },
    {
      icon: TbLock,
      title: "Bonded Warehousing",
      description: "Tax-deferred storage for imports under customs bond",
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
    },
    {
      icon: TbAlertTriangle,
      title: "Hazmat Storage",
      description: "Licensed facility for dangerous goods classification",
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
    },
  ];

  const stats = [
    { value: "105,000+", label: "Total Sq Ft", icon: TbRulerMeasure },
    { value: "5,000+", label: "Pallet Positions", icon: TbPackage },
    { value: "500+", label: "TEU Capacity", icon: TbContainer },
    { value: "2", label: "Strategic Locations", icon: TbMapPin },
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

      // Location cards animation
      locationsRef.current.forEach((card, index) => {
        if (!card) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { x: index === 0 ? -80 : 80, opacity: 0, rotateY: index === 0 ? -15 : 15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );

        // Hover effect
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

      // Storage types animation
      storageRef.current.forEach((item, index) => {
        if (!item) return;

        const icon = item.querySelector(".storage-icon");

        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          icon,
          { scale: 0, rotation: -45 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.1 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        item.addEventListener("mouseenter", () => {
          gsap.to(item, { y: -5, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1.15, rotation: 8, duration: 0.3, ease: "power2.out" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(item, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      // Stats counter animation
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;

        const valueEl = stat.querySelector(".stat-value");
        const iconEl = stat.querySelector(".stat-icon");

        gsap.fromTo(
          stat,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          iconEl,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            delay: index * 0.1 + 0.2,
            ease: "back.out(2)",
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center">
              <TbBuildingWarehouse className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
                Our Facilities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Warehouse Facilities
              </h2>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl text-lg">
            Strategically located warehouses in Dhaka and Chittagong, offering 
            comprehensive storage solutions for all types of cargo.
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {locations.map((location, index) => (
            <div
              key={index}
              ref={(el) => (locationsRef.current[index] = el)}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Header */}
              <div className={`${location.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{location.city}</h3>
                    <div className="flex items-center gap-2 mt-1 text-white/80">
                      <TbMapPin className="w-4 h-4" />
                      <span className="text-sm">{location.area}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{location.size}</div>
                    <div className="text-sm text-white/80">{location.unit}</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {location.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Storage Types */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            Storage Solutions
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storageTypes.map((storage, index) => {
              const Icon = storage.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (storageRef.current[index] = el)}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div
                    className={`storage-icon w-14 h-14 ${storage.lightColor} rounded-xl flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-7 h-7 ${storage.color.replace("bg-", "text-")}`} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {storage.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {storage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-emerald-500 rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (statsRef.current[index] = el)}
                  className="text-center"
                >
                  <div className="stat-icon w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="stat-value text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-emerald-100 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseFacilities;
