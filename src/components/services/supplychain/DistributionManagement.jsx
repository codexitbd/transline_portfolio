import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbTruckDelivery,
  TbPackage,
  TbClock,
  TbShoppingCart,
  TbCreditCard,
  TbRoute,
  TbBuilding,
  TbHome,
  TbRotate,
  TbArrowRight,
  TbCircleCheck,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const DistributionManagement = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const fulfillmentRef = useRef(null);
  const networkRef = useRef(null);
  const flowRef = useRef(null);

  const orderFulfillment = {
    title: "Order Fulfillment",
    icon: TbPackage,
    features: [
      { icon: TbPackage, text: "Pick, pack, and ship services" },
      { icon: TbClock, text: "Order processing within 24 hours" },
      { icon: TbShoppingCart, text: "Multi-channel distribution (Retail, E-commerce, B2B)" },
      { icon: TbCreditCard, text: "COD handling for e-commerce" },
    ],
  };

  const transportNetwork = {
    title: "Transportation Network",
    icon: TbRoute,
    features: [
      { icon: TbBuilding, text: "Primary distribution (Warehouse to Regional Hubs)" },
      { icon: TbRoute, text: "Secondary distribution (Hub to Retail)" },
      { icon: TbHome, text: "Last-mile delivery" },
      { icon: TbRotate, text: "Return logistics management" },
    ],
  };

  const distributionFlow = [
    { label: "Warehouse", icon: TbBuilding },
    { label: "Regional Hub", icon: TbRoute },
    { label: "Local Hub", icon: TbTruckDelivery },
    { label: "Customer", icon: TbHome },
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
      [fulfillmentRef, networkRef].forEach((ref, index) => {
        if (!ref.current) return;

        const card = ref.current;
        const items = card.querySelectorAll(".feature-item");
        const icon = card.querySelector(".card-icon");

        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          icon,
          { scale: 0, rotation: -20 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.15 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          items,
          { x: -15, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: index * 0.15 + 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Flow diagram animation
      if (flowRef.current) {
        const nodes = flowRef.current.querySelectorAll(".flow-node");
        const connectors = flowRef.current.querySelectorAll(".flow-connector");

        gsap.fromTo(
          flowRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: flowRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        nodes.forEach((node, i) => {
          gsap.fromTo(
            node,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              delay: 0.3 + i * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: flowRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Pulse animation
          const iconWrapper = node.querySelector(".node-icon");
          gsap.to(iconWrapper, {
            scale: 1.05,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });

        connectors.forEach((connector, i) => {
          gsap.fromTo(
            connector,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.4,
              delay: 0.5 + i * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: flowRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Arrow animation
          const arrow = connector.querySelector(".connector-arrow");
          if (arrow) {
            gsap.to(arrow, {
              x: 5,
              duration: 0.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbTruckDelivery className="w-4 h-4" />
            Solution 4
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Distribution Management (Outbound)
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Efficient order fulfillment and transportation network for 
            seamless delivery to your customers.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Order Fulfillment Card */}
          <div
            ref={fulfillmentRef}
            className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="card-icon w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                <TbPackage className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {orderFulfillment.title}
              </h3>
            </div>

            <div className="space-y-3">
              {orderFulfillment.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="feature-item flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors duration-300 group cursor-pointer"
                  >
                    <div className="shrink-0 w-9 h-9 bg-white group-hover:bg-blue-100 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-2 text-blue-500">
                <TbClock className="w-4 h-4" />
                <span className="text-sm font-medium">Same-day dispatch available</span>
              </div>
            </div>
          </div>

          {/* Transportation Network Card */}
          <div
            ref={networkRef}
            className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="card-icon w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <TbRoute className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {transportNetwork.title}
              </h3>
            </div>

            <div className="space-y-3">
              {transportNetwork.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="feature-item flex items-center gap-3 p-3 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-colors duration-300 group cursor-pointer"
                  >
                    <div className="shrink-0 w-9 h-9 bg-white group-hover:bg-emerald-100 rounded-lg flex items-center justify-center border border-gray-100 group-hover:border-emerald-200 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-gray-500 group-hover:text-emerald-500 transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium group-hover:text-emerald-700 transition-colors duration-300">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-2 text-emerald-500">
                <TbCircleCheck className="w-4 h-4" />
                <span className="text-sm font-medium">Nationwide coverage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Flow Diagram */}
        <div
          ref={flowRef}
          className="bg-gray-50 rounded-3xl p-6 md:p-10 border border-gray-100"
        >
          <h4 className="text-center text-lg font-semibold text-gray-800 mb-8">
            Distribution Flow
          </h4>

          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {distributionFlow.map((node, index) => {
              const Icon = node.icon;
              const isLast = index === distributionFlow.length - 1;
              return (
                <React.Fragment key={index}>
                  <div className="flow-node flex flex-col items-center">
                    <div className="node-icon w-14 h-14 md:w-16 md:h-16 bg-white border-2 border-orange-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md hover:border-orange-400 transition-all duration-300 cursor-pointer">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-orange-500" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-700 mt-3 text-center">
                      {node.label}
                    </span>
                  </div>

                  {!isLast && (
                    <div className="flow-connector flex-1 mx-2 md:mx-4 origin-left">
                      <div className="h-0.5 bg-orange-200 relative">
                        <div className="connector-arrow absolute right-0 top-1/2 -translate-y-1/2">
                          <TbArrowRight className="w-4 h-4 text-orange-400" />
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-200 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-xs text-gray-500 mt-1">Delivery Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-xs text-gray-500 mt-1">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24h</div>
              <div className="text-xs text-gray-500 mt-1">Avg. Fulfillment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistributionManagement;
