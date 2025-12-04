import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbBrandLinkedin, TbMail } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const LeadershipTeam = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const leaders = [
    {
      name: "Mohammad Rahman",
      position: "Managing Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
      bio: "25+ years of experience in international trade and logistics. Visionary leader who founded Transline with a mission to transform Bangladesh's logistics landscape.",
      linkedin: "#",
      email: "md@transline.com",
    },
    {
      name: "Fatima Ahmed",
      position: "Director of Operations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
      bio: "Expert in supply chain optimization with 18 years of experience. Oversees all operational aspects ensuring seamless service delivery across our network.",
      linkedin: "#",
      email: "operations@transline.com",
    },
    {
      name: "Karim Hassan",
      position: "Head of Customs & Compliance",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
      bio: "Former customs official with deep regulatory expertise. Ensures 100% compliance and smooth clearance for all shipments through complex trade corridors.",
      linkedin: "#",
      email: "customs@transline.com",
    },
    {
      name: "Nadia Sultana",
      position: "Head of Supply Chain Solutions",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
      bio: "Strategic thinker with expertise in end-to-end supply chain design. Leads our consulting division helping clients optimize their logistics operations.",
      linkedin: "#",
      email: "solutions@transline.com",
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

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        const image = card.querySelector(".leader-image");
        const content = card.querySelector(".leader-content");
        const social = card.querySelector(".leader-social");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
          }
        )
          .fromTo(
            image,
            { scale: 1.3, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(
            content,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(
            social,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.2"
          );

        // Hover effect
        card.addEventListener("mouseenter", () => {
          gsap.to(image, { scale: 1.1, duration: 0.4, ease: "power2.out" });
          gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(image, { scale: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            Meet Our Leaders
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Leadership Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Experienced professionals driving our vision of excellence in global
            logistics
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="leader-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

                {/* Name overlay on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                  <p className="text-orange-400 text-sm font-medium">
                    {leader.position}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="leader-content p-5">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {leader.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="leader-social px-5 pb-5 flex gap-3">
                <a
                  href={leader.linkedin}
                  className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                >
                  <TbBrandLinkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${leader.email}`}
                  className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-colors duration-300"
                >
                  <TbMail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
