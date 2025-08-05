import AOS from "aos";

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll("[data-aos]");
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("aos-animate"); // Skip animation
    }
  });

  AOS.init({
    once: true,
    duration: 500,
  });
});
