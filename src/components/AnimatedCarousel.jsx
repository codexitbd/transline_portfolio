import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "./Button";

const AnimatedCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [isTweening, setIsTweening] = useState(false);

  const wrapperRef = useRef(null);
  const slideRefs = useRef([]);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  const startXRef = useRef(0);
  const endXRef = useRef(0);

  const totalSlides = slides.length;
  const autoplayRef = useRef(null);

  const nextIndex = (step) => {
    let index = current + step;
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    return index;
  };

  const animateSlide = (targetIndex) => {
    if (isTweening || targetIndex === current) return;

    setIsTweening(true);

    const currentSlide = slideRefs.current[current];
    const nextSlide = slideRefs.current[targetIndex];

    // Prepare next slide
    gsap.set(nextSlide, { zIndex: 2, x: "100%" });
    gsap.set(currentSlide, { zIndex: 1 });

    // Text out
    gsap.to(textRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    gsap.to(subtitleRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    gsap.to(buttonRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    setTimeout(() => {
      textRef.current.innerHTML = slides[targetIndex].title;
      subtitleRef.current.innerHTML = slides[targetIndex].subtitle;
      gsap.set(textRef.current, { y: 50 });
      gsap.set(subtitleRef.current, { y: 30 });
      gsap.set(buttonRef.current, { y: 20 });
    }, 300);

    // Slide animation
    gsap.to(nextSlide, {
      x: "0%",
      duration: 2,
      ease: "power3.inOut",
    });

    // Text in sync
    setTimeout(() => {
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      });
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
      });
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.4,
      });
    }, 1500);

    setTimeout(() => {
      gsap.set(currentSlide, { zIndex: 0 });
      setIsTweening(false);
    }, 2000);

    setCurrent(targetIndex);
  };

  useEffect(() => {
    // Initialize slide positions
    slideRefs.current.forEach((slide, index) => {
      gsap.set(slide, {
        x: index === 0 ? "0%" : "100%",
        zIndex: index === 0 ? 2 : 1,
      });
    });

    const handleSwipe = () => {
      const delta = endXRef.current - startXRef.current;
      if (delta < -50) animateSlide(nextIndex(1)); // left
      if (delta > 50) animateSlide(nextIndex(-1)); // right
    };

    const initEvents = () => {
      const el = wrapperRef.current;

      el.addEventListener("touchstart", (e) => {
        startXRef.current = e.changedTouches[0].clientX;
      });

      el.addEventListener("touchend", (e) => {
        endXRef.current = e.changedTouches[0].clientX;
        handleSwipe();
      });

      el.addEventListener("mousedown", (e) => {
        startXRef.current = e.clientX;
      });

      el.addEventListener("mouseup", (e) => {
        endXRef.current = e.clientX;
        handleSwipe();
      });
    };

    initEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autoplay effect
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      const next = (current + 1) % totalSlides;
      animateSlide(next);
    }, 5000);

    return () => clearInterval(autoplayRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, totalSlides]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-screen bg-black flex justify-center items-center overflow-hidden"
    >
      {/* Slides */}
      <div className="absolute w-full h-full overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className="absolute top-0 left-0 w-full h-full"
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Title Text */}
      <div className="absolute bottom-[220px] left-[120px] z-10 max-w-2xl">
        <div
          ref={textRef}
          className="text-white text-6xl font-semibold"
        >
          {slides[0].title}
        </div>
        <div
          ref={subtitleRef}
          className="text-white/80 text-xl mt-4"
        >
          {slides[0].subtitle}
        </div>
        <div ref={buttonRef} className="mt-8">
          <Button
            id="get-quote-btn"
            title="Get Free Quote"
            containerClass="!bg-orange-500 text-white hover:bg-orange-600"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-20 left-20 flex z-10">
        {slides.map((s, i) => (
          <div
            key={i}
            className="mr-6 cursor-pointer"
            onClick={() => animateSlide(i)}
          >
            <span
              className={`text-white transition-opacity duration-300 ${
                current === i ? "opacity-100" : "opacity-50"
              }`}
            >
              {s.title}
            </span>

            <div
              className={`h-[5px] mt-3 overflow-hidden transition-all duration-500 ${
                current === i ? "opacity-100 w-[200px]" : "opacity-50 w-[120px]"
              } bg-white/40`}
            >
              <div
                className={`h-full bg-white transition-transform duration-700 ${
                  current === i ? "translate-x-0" : "-translate-x-full"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="absolute bottom-20 right-10 text-white text-xl z-10 cursor-pointer"
        onClick={() => animateSlide(nextIndex(1))}
      >
        Next →
      </button>
    </div>
  );
};

export default AnimatedCarousel;
