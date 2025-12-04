import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import Button from "./Button";

const AnimatedCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const isTweeningRef = useRef(false);

  const wrapperRef = useRef(null);
  const slideRefs = useRef([]);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  const startXRef = useRef(0);
  const endXRef = useRef(0);

  const totalSlides = slides.length;
  const autoplayRef = useRef(null);
  const currentRef = useRef(0);

  const animateSlide = (targetIndex) => {
    if (isTweeningRef.current || targetIndex === currentRef.current) return;

    isTweeningRef.current = true;

    const currentSlide = slideRefs.current[currentRef.current];
    const nextSlide = slideRefs.current[targetIndex];

    if (!currentSlide || !nextSlide) {
      isTweeningRef.current = false;
      return;
    }

    // Kill any existing animations on these slides
    gsap.killTweensOf(currentSlide);
    gsap.killTweensOf(nextSlide);

    // Prepare next slide - position it off-screen to the right
    gsap.set(nextSlide, { 
      xPercent: 100, 
      zIndex: 2,
      visibility: "visible"
    });
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
      if (textRef.current) textRef.current.innerHTML = slides[targetIndex].title;
      if (subtitleRef.current) subtitleRef.current.innerHTML = slides[targetIndex].subtitle;
      gsap.set(textRef.current, { y: 50 });
      gsap.set(subtitleRef.current, { y: 30 });
      gsap.set(buttonRef.current, { y: 20 });
    }, 300);

    // Slide animation - slide next in from right, slide current out to left
    const tl = gsap.timeline({
      onComplete: () => {
        // After animation completes, reset the old slide
        gsap.set(currentSlide, { 
          xPercent: 100, 
          zIndex: 0,
          visibility: "hidden"
        });
        isTweeningRef.current = false;
      }
    });

    tl.to(nextSlide, {
      xPercent: 0,
      duration: 1.2,
      ease: "power3.inOut",
    }, 0);

    tl.to(currentSlide, {
      xPercent: -30,
      duration: 1.2,
      ease: "power3.inOut",
    }, 0);

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
    }, 600);

    currentRef.current = targetIndex;
    setCurrent(targetIndex);
  };

  // Handle navigation
  const goToNext = () => {
    let next = currentRef.current + 1;
    if (next >= totalSlides) next = 0;
    animateSlide(next);
  };

  const goToPrev = () => {
    let prev = currentRef.current - 1;
    if (prev < 0) prev = totalSlides - 1;
    animateSlide(prev);
  };

  useEffect(() => {
    // Initialize slide positions
    slideRefs.current.forEach((slide, index) => {
      gsap.set(slide, {
        xPercent: index === 0 ? 0 : 100,
        zIndex: index === 0 ? 2 : 0,
        visibility: index === 0 ? "visible" : "hidden",
      });
    });

    const el = wrapperRef.current;

    const handleSwipe = () => {
      const delta = endXRef.current - startXRef.current;
      if (delta < -50) {
        let next = currentRef.current + 1;
        if (next >= totalSlides) next = 0;
        animateSlide(next);
      }
      if (delta > 50) {
        let prev = currentRef.current - 1;
        if (prev < 0) prev = totalSlides - 1;
        animateSlide(prev);
      }
    };

    const handleTouchStart = (e) => {
      startXRef.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      endXRef.current = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleMouseDown = (e) => {
      startXRef.current = e.clientX;
    };

    const handleMouseUp = (e) => {
      endXRef.current = e.clientX;
      handleSwipe();
    };

    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);

  // Autoplay effect
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      let next = currentRef.current + 1;
      if (next >= totalSlides) next = 0;
      animateSlide(next);
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);

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

      {/* Title Text - Responsive positioning and sizing */}
      <div className="absolute bottom-32 sm:bottom-40 md:bottom-52 left-6 sm:left-12 md:left-20 lg:left-28 z-10 max-w-[90%] sm:max-w-xl md:max-w-2xl px-2">
        <div
          ref={textRef}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight"
        >
          {slides[0].title}
        </div>
        <div
          ref={subtitleRef}
          className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl mt-3 md:mt-4 leading-relaxed"
        >
          {slides[0].subtitle}
        </div>
        <div ref={buttonRef} className="mt-5 md:mt-8">
          <Button
            id="get-quote-btn"
            title="Get Free Quote"
            containerClass="!bg-orange-500 text-white hover:bg-orange-600 !text-xs sm:!text-sm"
          />
        </div>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:flex absolute bottom-16 lg:bottom-20 left-12 lg:left-20 z-10">
        {slides.map((s, i) => (
          <div
            key={i}
            className="mr-4 lg:mr-6 cursor-pointer"
            onClick={() => animateSlide(i)}
          >
            <span
              className={`text-white text-sm lg:text-base transition-opacity duration-300 ${
                current === i ? "opacity-100" : "opacity-50"
              }`}
            >
              {s.title}
            </span>

            <div
              className={`h-1 lg:h-[5px] mt-2 lg:mt-3 overflow-hidden transition-all duration-500 ${
                current === i ? "opacity-100 w-32 lg:w-48" : "opacity-50 w-20 lg:w-28"
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

      {/* Mobile Navigation - Prev/Next buttons + dots */}
      <div className="md:hidden absolute bottom-8 left-0 right-0 z-10 px-6">
        <div className="flex items-center justify-between">
          {/* Prev Button */}
          <button
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer active:scale-95"
            onClick={goToPrev}
          >
            <TbChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => animateSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  current === i
                    ? "w-8 bg-orange-500"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer active:scale-95"
            onClick={goToNext}
          >
            <TbChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Next Button - Hidden on mobile */}
      <button
        className="hidden md:flex absolute bottom-16 lg:bottom-20 right-8 lg:right-10 text-white text-base lg:text-xl z-10 cursor-pointer items-center gap-2 hover:gap-3 transition-all group"
        onClick={goToNext}
      >
        <span className="opacity-80 group-hover:opacity-100">Next</span>
        <TbChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>
    </div>
  );
};

export default AnimatedCarousel;
