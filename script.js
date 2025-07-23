// Font loading optimization
document.fonts.ready.then(() => {
  document.documentElement.classList.add("fonts-loaded");
});

// Debounce function for scroll/resize events
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit = 100) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Cache DOM elements
const domCache = {
  card: document.querySelector(".glass-card"),
  header: document.querySelector("header"),
  mobileMenuBtn: document.getElementById("mobile-menu-button"),
  navMenu: document.querySelector("nav .hidden.md\\:flex"),
  yearElement: document.getElementById("year"),
  testimonialTrack: document.getElementById("testimonial-track"),
  testimonialDots: document.getElementById("testimonial-dots"),
};

// Animate glass card on load without forced reflow
function initCardAnimation() {
  if (!domCache.card) return;

  requestAnimationFrame(() => {
    domCache.card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(30px)";

    requestAnimationFrame(() => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          domCache.card.style.transform =
            "perspective(1000px) rotateX(5deg) rotateY(-5deg)";
        });
      }, 1000);
    });
  });
}

// Optimized header scroll effect
function initHeaderScroll() {
  if (!domCache.header) return;

  let lastScrollY = window.scrollY;
  const updateHeader = throttle(() => {
    const scrollY = window.scrollY;
    if (Math.abs(scrollY - lastScrollY) > 5) {
      if (scrollY > 50) {
        domCache.header.classList.add("shadow-lg");
        domCache.header.style.background = "rgba(255, 255, 255, 0.95)";
      } else {
        domCache.header.classList.remove("shadow-lg");
        domCache.header.style.background = "transparent";
      }
      lastScrollY = scrollY;
    }
  }, 16);

  window.addEventListener("scroll", updateHeader, { passive: true });
}

// Mobile menu toggle with classList optimization
function initMobileMenu() {
  if (!domCache.mobileMenuBtn || !domCache.navMenu) return;

  const classLists = {
    show: [
      "flex",
      "absolute",
      "top-full",
      "left-0",
      "right-0",
      "bg-white",
      "shadow-md",
      "p-4",
      "flex-col",
      "space-y-4",
      "space-x-0",
    ],
    hide: ["hidden"],
  };

  const toggleMenu = () => {
    const isHidden = domCache.navMenu.classList.contains("hidden");

    // Remove all classes first
    domCache.navMenu.classList.remove(...classLists.show, ...classLists.hide);

    // Add appropriate classes
    if (isHidden) {
      domCache.navMenu.classList.add(...classLists.show);
    } else {
      domCache.navMenu.classList.add(...classLists.hide);
    }
  };

  domCache.mobileMenuBtn.addEventListener("click", toggleMenu);
}

// Optimized intersection observer
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".slide-in-left, .slide-in-right, .fade-in, .rotate-in, .flip-in"
  );
  animatedElements.forEach((el) => observer.observe(el));
}

// Case Study Modal handling
function initCaseStudyModal() {
  const modal = document.getElementById("caseStudyModal");
  const overlay = document.getElementById("caseStudyOverlay");
  const triggers = document.querySelectorAll(".case-study-trigger");
  const closeCaseBtns = document.querySelectorAll(".close-case-btn");

  if (!modal) return;

  function openCaseStudy(project) {
    // Your open logic here
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeCaseStudy() {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  // Add event listeners to all triggers
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openCaseStudy(trigger.dataset.project);
    });
  });

  // Add event listeners to all triggers
  closeCaseBtns.forEach((btn) => {
    btn.addEventListener("click", closeCaseStudy);
  });

  // Close when clicking overlay
  if (overlay) {
    overlay.addEventListener("click", closeCaseStudy);
  }

  // Close when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeCaseStudy();
    }
  });
}

// Optimized Testimonial Carousel
function initTestimonialCarousel() {
  if (!domCache.testimonialTrack || !domCache.testimonialDots) return;

  // Color palette for testimonials
  const colorPalette = [
    {
      bg: "from-blue-500 to-blue-300",
      text: "text-blue-600",
      bgLight: "bg-blue-50",
      quote: "text-blue-100",
    },
    {
      bg: "from-teal-500 to-teal-300",
      text: "text-teal-600",
      bgLight: "bg-teal-50",
      quote: "text-teal-100",
    },
    {
      bg: "from-purple-500 to-purple-300",
      text: "text-purple-600",
      bgLight: "bg-purple-50",
      quote: "text-purple-100",
    },
    {
      bg: "from-amber-500 to-amber-300",
      text: "text-amber-600",
      bgLight: "bg-amber-50",
      quote: "text-amber-100",
    },
    {
      bg: "from-indigo-500 to-indigo-300",
      text: "text-indigo-600",
      bgLight: "bg-indigo-50",
      quote: "text-indigo-100",
    },
  ];

  const testimonials = document.querySelectorAll(".w-full.md\\:w-1\\/2");
  if (testimonials.length === 0) return;

  let currentIndex = 0;
  let cardWidth = 0;
  const visibleTestimonials = 2;
  let isReversed = false;
  let autoScrollInterval;
  let dotCount = 0;

  // Initialize card width using ResizeObserver
  const trackResizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.contentRect.width) {
        cardWidth = testimonials[0].offsetWidth;
        updateCarousel();
      }
    }
  });

  trackResizeObserver.observe(domCache.testimonialTrack);

  // Apply dynamic colors to testimonials
  function applyTestimonialColors() {
    testimonials.forEach((testimonial, index) => {
      const colorIndex = index % colorPalette.length;
      const colors = colorPalette[colorIndex];

      // Update avatar gradient
      const avatar = testimonial.querySelector(".rounded-full");
      if (avatar) {
        avatar.className = avatar.className.replace(
          /from-\w+-\d+ to-\w+-\d+/,
          colors.bg
        );
      }

      // Update project tag
      const projectTag = testimonial.querySelector(".text-xs.rounded-full");
      if (projectTag) {
        projectTag.classList.remove(
          "bg-blue-50",
          "text-blue-600",
          "bg-purple-50",
          "text-purple-600",
          "bg-teal-50",
          "text-teal-600"
        );
        projectTag.classList.add(colors.bgLight, colors.text);
      }

      // Update quote icon
      const quoteIcon = testimonial.querySelector(".fa-quote-right");
      if (quoteIcon) {
        quoteIcon.classList.remove(
          "text-blue-100",
          "text-purple-100",
          "text-teal-100",
          "text-amber-100"
        );
        quoteIcon.classList.add(colors.quote);
      }
    });
  }

  // Calculate number of dots needed
  function calculateDotCount() {
    return Math.max(1, testimonials.length - visibleTestimonials + 1);
  }

  // Create dots dynamically with accessibility support
  function createDots() {
    domCache.testimonialDots.innerHTML = "";
    domCache.testimonialDots.setAttribute("role", "tablist");
    domCache.testimonialDots.setAttribute(
      "aria-label",
      "Testimonial navigation controls"
    );

    dotCount = calculateDotCount();

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("button");
      dot.className = `testimonial-dot w-6 h-6 rounded-full focus:outline-none mx-2 ${
        i === 0 ? "bg-blue-600" : "bg-gray-300"
      } hover:bg-blue-500 transition-colors duration-200`;
      dot.dataset.index = i;
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      dot.setAttribute("aria-controls", `testimonial-${i}`);
      dot.setAttribute("id", `tab-${i}`);
      dot.setAttribute("aria-label", `View testimonial ${i + 1}`);
      dot.setAttribute("tabindex", i === 0 ? "0" : "-1");

      domCache.testimonialDots.appendChild(dot);
    }
  }

  function updateCarousel() {
    requestAnimationFrame(() => {
      domCache.testimonialTrack.style.transform = `translateX(-${
        currentIndex * cardWidth
      }px)`;
      updateDots();
      updateTestimonialVisibility();
    });
  }

  function updateDots() {
    const dots = document.querySelectorAll(".testimonial-dot");
    const activeDotIndex = Math.min(currentIndex, dotCount - 1);

    dots.forEach((dot, index) => {
      const isActive = index === activeDotIndex;
      dot.classList.toggle("bg-blue-600", isActive);
      dot.classList.toggle("bg-gray-300", !isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
      dot.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  function updateTestimonialVisibility() {
    testimonials.forEach((testimonial, index) => {
      const isVisible =
        index >= currentIndex && index < currentIndex + visibleTestimonials;
      testimonial.setAttribute("aria-hidden", !isVisible);
      testimonial.setAttribute("tabindex", isVisible ? "0" : "-1");
    });
  }

  function moveNext() {
    if (!isReversed) {
      if (currentIndex >= testimonials.length - visibleTestimonials) {
        isReversed = true;
        currentIndex--;
      } else {
        currentIndex++;
      }
    } else {
      if (currentIndex <= 0) {
        isReversed = false;
        currentIndex++;
      } else {
        currentIndex--;
      }
    }
    updateCarousel();
  }

  function handleDotClick(e) {
    if (e.target.classList.contains("testimonial-dot")) {
      currentIndex = parseInt(e.target.dataset.index);
      isReversed = false;
      updateCarousel();
      resetAutoScroll();
    }
  }

  function handleKeyDown(e) {
    const dots = document.querySelectorAll(".testimonial-dot");
    const currentDotIndex = Array.from(dots).findIndex(
      (dot) => dot.getAttribute("aria-selected") === "true"
    );

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentDotIndex + 1) % dots.length;
      dots[nextIndex].click();
      dots[nextIndex].focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentDotIndex - 1 + dots.length) % dots.length;
      dots[prevIndex].click();
      dots[prevIndex].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      dots[0].click();
      dots[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      dots[dots.length - 1].click();
      dots[dots.length - 1].focus();
    }
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(moveNext, 5000);
  }

  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  }

  // Initialize
  applyTestimonialColors();
  createDots();
  updateCarousel();
  startAutoScroll();

  // Event delegation for dots
  domCache.testimonialDots.addEventListener("click", handleDotClick);
  domCache.testimonialDots.addEventListener("keydown", handleKeyDown);

  // Pause on hover/focus
  domCache.testimonialTrack.addEventListener("mouseenter", () =>
    clearInterval(autoScrollInterval)
  );
  domCache.testimonialTrack.addEventListener("mouseleave", startAutoScroll);
  domCache.testimonialTrack.addEventListener("focusin", () =>
    clearInterval(autoScrollInterval)
  );
  domCache.testimonialTrack.addEventListener("focusout", startAutoScroll);

  // Cleanup function
  return () => {
    clearInterval(autoScrollInterval);
    trackResizeObserver.disconnect();
    domCache.testimonialDots.removeEventListener("click", handleDotClick);
    domCache.testimonialDots.removeEventListener("keydown", handleKeyDown);
    domCache.testimonialTrack.removeEventListener("mouseenter", () =>
      clearInterval(autoScrollInterval)
    );
    domCache.testimonialTrack.removeEventListener(
      "mouseleave",
      startAutoScroll
    );
    domCache.testimonialTrack.removeEventListener("focusin", () =>
      clearInterval(autoScrollInterval)
    );
    domCache.testimonialTrack.removeEventListener("focusout", startAutoScroll);
  };
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Set current year
  if (domCache.yearElement) {
    domCache.yearElement.textContent = new Date().getFullYear();
  }

  // Initialize components
  initCardAnimation();
  initHeaderScroll();
  initMobileMenu();
  initIntersectionObserver();
  initCaseStudyModal();

  // Initialize testimonial carousel
  const cleanUpTestimonialCarousel = initTestimonialCarousel();

  // Cleanup when needed (e.g., for single page apps)
  window.addEventListener("beforeunload", () => {
    if (cleanUpTestimonialCarousel) {
      cleanUpTestimonialCarousel();
    }
  });
});
