import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbMap, TbExternalLink } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const mapLocations = [
  {
    id: 1,
    name: "Dhaka Office",
    address: "Banani, Dhaka",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5873399754847!2d90.39863567536154!3d23.79339848774731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70a45d26c05%3A0x1f6a89d9b9c04d76!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1701234567890!5m2!1sen!2sbd",
    directionsUrl: "https://maps.google.com/?q=23.7934,90.4008",
  },
  {
    id: 2,
    name: "Chittagong Office",
    address: "Agrabad C/A, Chittagong",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.9234567890123!2d91.82943567532891!3d22.33656578967543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5bcb6905d9!2sAgrabad%20Commercial%20Area!5e0!3m2!1sen!2sbd!4v1701234567890!5m2!1sen!2sbd",
    directionsUrl: "https://maps.google.com/?q=22.3384,91.8317",
  },
];

const OfficeMap = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mapsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Maps animation
      mapsRef.current.forEach((map, index) => {
        if (map) {
          gsap.fromTo(
            map,
            { y: 50, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: map,
                start: "top 85%",
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
            <TbMap className="w-4 h-4" />
            Find Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Office Locations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Visit us at our strategically located offices in Bangladesh's major business hubs.
          </p>
        </div>

        {/* Maps Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {mapLocations.map((location, index) => (
            <div
              key={location.id}
              ref={(el) => (mapsRef.current[index] = el)}
              className="group"
            >
              {/* Map Container */}
              <div className="relative bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
                {/* Map Iframe */}
                <div className="aspect-4/3">
                  <iframe
                    src={location.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${location.name} Map`}
                    className="w-full h-full"
                  />
                </div>

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-5 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{location.name}</h3>
                      <p className="text-sm text-gray-500">{location.address}</p>
                    </div>
                    <a
                      href={location.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full hover:bg-orange-600 transition-colors duration-300"
                    >
                      Directions
                      <TbExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeMap;
