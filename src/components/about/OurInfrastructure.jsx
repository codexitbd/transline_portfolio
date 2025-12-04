import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbBuildingWarehouse,
  TbTruck,
  TbMapPins,
  TbDeviceDesktopAnalytics,
  TbContainer,
  TbWorld,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const OurInfrastructure = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef([]);
  const imageRef = useRef(null);
  const featuresRef = useRef([]);

  const stats = [
    {
      icon: TbBuildingWarehouse,
      value: "75,000",
      unit: "sq ft",
      label: "Warehouse Space",
      description: "Across multiple strategic locations",
    },
    {
      icon: TbTruck,
      value: "45",
      unit: "+",
      label: "Fleet Vehicles",
      description: "Modern trucks and trailers",
    },
    {
      icon: TbContainer,
      value: "120",
      unit: "+",
      label: "Containers",
      description: "Various sizes available",
    },
    {
      icon: TbMapPins,
      value: "5",
      unit: "",
      label: "Office Locations",
      description: "Dhaka, Chittagong, Sylhet & more",
    },
  ];

  const features = [
    {
      icon: TbDeviceDesktopAnalytics,
      title: "Warehouse Management System",
      description: "Advanced WMS for inventory tracking and order fulfillment",
    },
    {
      icon: TbWorld,
      title: "Transport Management System",
      description: "End-to-end visibility and route optimization",
    },
    {
      icon: TbMapPins,
      title: "Real-Time Tracking",
      description: "GPS-enabled fleet and shipment monitoring 24/7",
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
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats counter animation
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;
        
        const valueEl = stat.querySelector(".stat-value");
        const iconEl = stat.querySelector(".stat-icon");

        if (!valueEl || !iconEl) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          stat,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out",
          }
        ).fromTo(
          iconEl,
          { rotate: -90, scale: 0 },
          { rotate: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.4"
        );

        // Animate number counting
        const targetValue = parseInt(valueEl.dataset.value);
        const counter = { val: 0 };
        
        gsap.to(counter, {
          val: targetValue,
          duration: 2,
          delay: 0.3 + index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            valueEl.textContent = Math.floor(counter.val).toLocaleString();
          },
        });
      });

      // Features animation
      featuresRef.current.forEach((feature, index) => {
        if (!feature) return;
        
        gsap.fromTo(
          feature,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 shadow-sm mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            Built for Scale
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Infrastructure
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            State-of-the-art facilities and technology powering seamless
            logistics operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="stat-icon w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className="stat-value text-3xl md:text-4xl font-bold text-gray-900"
                    data-value={stat.value.replace(/,/g, "")}
                  >
                    0
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-orange-500">
                    {stat.unit}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Image & Technology Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200"
              alt="Warehouse Operations"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-gray-900/60 to-transparent" />

            {/* Overlay Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
                    <TbBuildingWarehouse className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Modern Warehousing
                    </p>
                    <p className="text-sm text-gray-600">
                      Climate-controlled & secure facilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Features */}
          <div className="space-y-5">
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Technology Backbone
              </h3>
              <p className="text-gray-600">
                Our operations are powered by cutting-edge technology systems
                ensuring visibility, efficiency, and reliability.
              </p>
            </div>

            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (featuresRef.current[index] = el)}
                  className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-orange-50 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gray-600 group-hover:text-orange-500 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
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

export default OurInfrastructure;
