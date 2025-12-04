import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbShieldCheck,
  TbVideo,
  TbUsers,
  TbFingerprint,
  TbWall,
  TbFlame,
  TbSearch,
  TbClipboardCheck,
  TbTestPipe,
  TbFileDescription,
  TbForklift,
  TbBox,
  TbCrane,
  TbTruckLoading,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const WarehouseFeatures = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const categoriesRef = useRef([]);

  const featureCategories = [
    {
      title: "Security Systems",
      icon: TbShieldCheck,
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
      features: [
        { icon: TbVideo, text: "24/7 CCTV Surveillance" },
        { icon: TbUsers, text: "Trained Security Personnel" },
        { icon: TbFingerprint, text: "Access Control Systems" },
        { icon: TbWall, text: "Perimeter Fencing" },
        { icon: TbFlame, text: "Fire Detection & Suppression" },
      ],
    },
    {
      title: "Quality Control",
      icon: TbClipboardCheck,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      features: [
        { icon: TbSearch, text: "Cargo Inspection Areas" },
        { icon: TbClipboardCheck, text: "Quality Checking Facilities" },
        { icon: TbTestPipe, text: "Sampling & Testing Support" },
        { icon: TbFileDescription, text: "Damage Documentation" },
      ],
    },
    {
      title: "Handling Equipment",
      icon: TbForklift,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      features: [
        { icon: TbForklift, text: "Forklifts (3-10 ton capacity)" },
        { icon: TbBox, text: "Pallet Jacks" },
        { icon: TbCrane, text: "Reach Stackers" },
        { icon: TbTruckLoading, text: "Loading Docks with Ramps" },
      ],
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
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Category cards animation
      categoriesRef.current.forEach((category, index) => {
        if (!category) return;

        const header = category.querySelector(".category-header");
        const items = category.querySelectorAll(".feature-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          category,
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
            header,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" },
            "-=0.3"
          )
          .fromTo(
            items,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.2"
          );

        // Hover effect on category
        category.addEventListener("mouseenter", () => {
          gsap.to(category, { y: -8, duration: 0.3, ease: "power2.out" });
        });
        category.addEventListener("mouseleave", () => {
          gsap.to(category, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-4">
            <TbShieldCheck className="w-4 h-4" />
            Infrastructure
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Warehouse Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Modern infrastructure equipped with advanced security, quality control 
            platforms, and professional handling equipment.
          </p>
        </div>

        {/* Feature Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {featureCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={index}
                ref={(el) => (categoriesRef.current[index] = el)}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
              >
                {/* Header */}
                <div className="category-header flex items-center gap-4 mb-8">
                  <div
                    className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center`}
                  >
                    <CategoryIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>

                {/* Features List */}
                <ul className="space-y-4">
                  {category.features.map((feature, idx) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <li
                        key={idx}
                        className="feature-item flex items-center gap-4 p-3 bg-white rounded-xl hover:shadow-sm transition-all duration-200"
                      >
                        <div
                          className={`w-10 h-10 ${category.lightColor} rounded-lg flex items-center justify-center shrink-0`}
                        >
                          <FeatureIcon
                            className={`w-5 h-5 ${category.color.replace("bg-", "text-")}`}
                          />
                        </div>
                        <span className="text-gray-700 font-medium text-sm">
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WarehouseFeatures;
