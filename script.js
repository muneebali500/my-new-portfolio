// Animate glass card on load
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".glass-card");
  setTimeout(() => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(30px)";
  }, 500);
  setTimeout(() => {
    card.style.transform = "perspective(1000px) rotateX(5deg) rotateY(-5deg)";
  }, 1500);
});

// Header scroll effect
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("shadow-lg");
    header.style.background = "rgba(255, 255, 255, 0.95)";
  } else {
    header.classList.remove("shadow-lg");
    header.style.background = "transparent";
  }
});

document.fonts.load('1em "Satoshi"').then(() => {
  document.documentElement.classList.add("fonts-loaded");
});

// Intro Video Modal
// const introBtn = document.getElementById("intro-btn");
// const videoModal = document.getElementById("video-modal");
// const closeVideoModalSign = document.getElementById("close-video-modal-sign");
// const videoElement = document.querySelector("#video-modal video");

// introBtn.addEventListener("click", () => {
//   videoModal.classList.remove("hidden");
//   videoElement.play();
// });

// closeVideoModalSign.addEventListener("click", () => {
//   videoModal.classList.add("hidden");
//   videoElement.pause(); // Pause the video
//   videoElement.currentTime = 0; // Reset to start (optional)
// });

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-button");
const navMenu = document.querySelector("nav .hidden.md\\:flex");

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
  navMenu.classList.toggle("flex");
  navMenu.classList.toggle("absolute");
  navMenu.classList.toggle("top-full");
  navMenu.classList.toggle("left-0");
  navMenu.classList.toggle("right-0");
  navMenu.classList.toggle("bg-white");
  navMenu.classList.toggle("shadow-md");
  navMenu.classList.toggle("p-4");
  navMenu.classList.toggle("flex-col");
  navMenu.classList.toggle("space-y-4");
  navMenu.classList.toggle("space-x-0");
});

// Initialize intersection observer for experience cards
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".slide-in-left, .slide-in-right").forEach((el) => {
    observer.observe(el);
  });
});

// Case Study Modal Functions
function openCaseStudy(project) {
  const modal = document.getElementById("caseStudyModal");

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCaseStudy() {
  document.getElementById("caseStudyModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  if (e.target === document.getElementById("caseStudyOverlay")) {
    closeCaseStudy();
  }
});

// // Testimonial Carousel Logic
// document.addEventListener("DOMContentLoaded", function () {
//   // Color palette for testimonials
//   const colorPalette = [
//     {
//       bg: "from-blue-500 to-blue-300",
//       text: "text-blue-600",
//       bgLight: "bg-blue-50",
//       quote: "text-blue-100",
//     },
//     {
//       bg: "from-teal-500 to-teal-300",
//       text: "text-teal-600",
//       bgLight: "bg-teal-50",
//       quote: "text-teal-100",
//     },
//     {
//       bg: "from-purple-500 to-purple-300",
//       text: "text-purple-600",
//       bgLight: "bg-purple-50",
//       quote: "text-purple-100",
//     },
//     {
//       bg: "from-amber-500 to-amber-300",
//       text: "text-amber-600",
//       bgLight: "bg-amber-50",
//       quote: "text-amber-100",
//     },
//     {
//       bg: "from-indigo-500 to-indigo-300",
//       text: "text-indigo-600",
//       bgLight: "bg-indigo-50",
//       quote: "text-indigo-100",
//     },
//   ];

//   const track = document.getElementById("testimonial-track");
//   const dotsContainer = document.getElementById("testimonial-dots");
//   const testimonials = document.querySelectorAll(".w-full.md\\:w-1\\/2");
//   let currentIndex = 0;
//   let cardWidth = testimonials[0].offsetWidth;
//   const visibleTestimonials = 2;
//   let isReversed = false;
//   let autoScrollInterval;

//   // Apply dynamic colors to testimonials
//   function applyTestimonialColors() {
//     testimonials.forEach((testimonial, index) => {
//       const colorIndex = index % colorPalette.length;
//       const colors = colorPalette[colorIndex];

//       // Update avatar gradient
//       const avatar = testimonial.querySelector(".rounded-full");
//       avatar.className = avatar.className.replace(
//         /from-\w+-\d+ to-\w+-\d+/,
//         colors.bg
//       );

//       // Update project tag
//       const projectTag = testimonial.querySelector(".text-xs.rounded-full");
//       projectTag.classList.remove(
//         "bg-blue-50",
//         "text-blue-600",
//         "bg-purple-50",
//         "text-purple-600",
//         "bg-teal-50",
//         "text-teal-600"
//       );
//       projectTag.classList.add(colors.bgLight, colors.text);

//       // Update quote icon
//       const quoteIcon = testimonial.querySelector(".fa-quote-right");
//       quoteIcon.classList.remove(
//         "text-blue-100",
//         "text-purple-100",
//         "text-teal-100",
//         "text-amber-100"
//       );
//       quoteIcon.classList.add(colors.quote);
//     });
//   }

//   // Calculate number of dots needed
//   const dotCount = Math.max(1, testimonials.length - visibleTestimonials + 1);

//   // Create dots dynamically
//   function createDots() {
//     console.log("create dot function");
//     dotsContainer.innerHTML = "";

//     for (let i = 0; i < dotCount; i++) {
//       const dot = document.createElement("button");
//       dot.className = `testimonial-dot w-3 h-3 rounded-full focus:outline-none ${
//         i === 0 ? "bg-blue-600" : "bg-gray-300"
//       }`;
//       dot.dataset.index = i;
//       dotsContainer.appendChild(dot);
//     }
//   }

//   function updateCarousel() {
//     track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
//     updateDots();
//   }

//   function updateDots() {
//     const dots = document.querySelectorAll(".testimonial-dot");
//     const activeDotIndex = Math.min(currentIndex, dotCount - 1);

//     dots.forEach((dot, index) => {
//       dot.classList.toggle("bg-blue-600", index === activeDotIndex);
//       dot.classList.toggle("bg-gray-300", index !== activeDotIndex);
//     });
//   }

//   function moveNext() {
//     if (!isReversed) {
//       if (currentIndex >= testimonials.length - visibleTestimonials) {
//         isReversed = true;
//         currentIndex--;
//       } else {
//         currentIndex++;
//       }
//     } else {
//       if (currentIndex <= 0) {
//         isReversed = false;
//         currentIndex++;
//       } else {
//         currentIndex--;
//       }
//     }
//     updateCarousel();
//   }

//   function handleDotClick(e) {
//     if (e.target.classList.contains("testimonial-dot")) {
//       currentIndex = parseInt(e.target.dataset.index);
//       isReversed = false;
//       updateCarousel();
//       resetAutoScroll();
//     }
//   }

//   function startAutoScroll() {
//     autoScrollInterval = setInterval(moveNext, 5000);
//   }

//   function resetAutoScroll() {
//     clearInterval(autoScrollInterval);
//     startAutoScroll();
//   }

//   // Initialize
//   applyTestimonialColors();
//   createDots();
//   updateCarousel();
//   startAutoScroll();

//   // Event delegation for dots
//   dotsContainer.addEventListener("click", handleDotClick);

//   // Pause on hover
//   track.addEventListener("mouseenter", () => {
//     clearInterval(autoScrollInterval);
//   });

//   track.addEventListener("mouseleave", () => {
//     startAutoScroll();
//   });

//   // Handle window resize
//   window.addEventListener("resize", () => {
//     cardWidth = testimonials[0].offsetWidth;
//     updateCarousel();
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
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

  const track = document.getElementById("testimonial-track");
  const dotsContainer = document.getElementById("testimonial-dots");
  const testimonials = document.querySelectorAll(".w-full.md\\:w-1\\/2");
  let currentIndex = 0;
  let cardWidth = testimonials[0].offsetWidth;
  const visibleTestimonials = 2;
  let isReversed = false;
  let autoScrollInterval;

  // Apply dynamic colors to testimonials
  function applyTestimonialColors() {
    testimonials.forEach((testimonial, index) => {
      const colorIndex = index % colorPalette.length;
      const colors = colorPalette[colorIndex];

      // Update avatar gradient
      const avatar = testimonial.querySelector(".rounded-full");
      avatar.className = avatar.className.replace(
        /from-\w+-\d+ to-\w+-\d+/,
        colors.bg
      );

      // Update project tag
      const projectTag = testimonial.querySelector(".text-xs.rounded-full");
      projectTag.classList.remove(
        "bg-blue-50",
        "text-blue-600",
        "bg-purple-50",
        "text-purple-600",
        "bg-teal-50",
        "text-teal-600"
      );
      projectTag.classList.add(colors.bgLight, colors.text);

      // Update quote icon
      const quoteIcon = testimonial.querySelector(".fa-quote-right");
      quoteIcon.classList.remove(
        "text-blue-100",
        "text-purple-100",
        "text-teal-100",
        "text-amber-100"
      );
      quoteIcon.classList.add(colors.quote);

      // Add accessibility attributes to each testimonial
      testimonial.setAttribute("role", "tabpanel");
      testimonial.setAttribute(
        "aria-labelledby",
        `testimonial-heading-${index}`
      );
      testimonial.setAttribute("id", `testimonial-${index}`);
      testimonial.setAttribute("aria-hidden", index > 1 ? "true" : "false");
      testimonial.setAttribute("tabindex", index === 0 ? "0" : "-1");

      // Add heading for screen readers
      const heading = testimonial.querySelector("h3");
      heading.setAttribute("id", `testimonial-heading-${index}`);
    });
  }

  // Calculate number of dots needed
  const dotCount = Math.max(1, testimonials.length - visibleTestimonials + 1);

  // Create dots dynamically with accessibility support
  function createDots() {
    dotsContainer.innerHTML = "";
    dotsContainer.setAttribute("role", "tablist");
    dotsContainer.setAttribute("aria-label", "Testimonial navigation controls");

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

      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
    updateTestimonialVisibility();
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

      // Focus the first visible testimonial for screen readers
      const firstVisibleTestimonial = document.querySelector(
        `[data-index="${currentIndex}"]`
      );
      if (firstVisibleTestimonial) {
        firstVisibleTestimonial.focus();
      }
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
  dotsContainer.addEventListener("click", handleDotClick);
  dotsContainer.addEventListener("keydown", handleKeyDown);

  // Pause on hover/focus
  track.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
  track.addEventListener("mouseleave", startAutoScroll);
  track.addEventListener("focusin", () => clearInterval(autoScrollInterval));
  track.addEventListener("focusout", startAutoScroll);

  // Handle window resize
  function handleResize() {
    cardWidth = testimonials[0].offsetWidth;
    updateCarousel();
  }

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(track);

  // Cleanup on unmount
  return () => {
    clearInterval(autoScrollInterval);
    resizeObserver.disconnect();
  };
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document
  .querySelectorAll(".fade-in, .rotate-in, .flip-in")
  .forEach((el) => observer.observe(el));

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
