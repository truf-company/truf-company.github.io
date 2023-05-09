// Slider
const swiper = new Swiper(".review-slider", {
  loop: true,
  autoplay: true,
  spaceBetween: 25,
  speed: 1200,
  navigation: {
    nextEl: ".btn-right",
    prevEl: ".btn-left",
  },
});

window.addEventListener('load', () => {
  document.querySelectorAll(".feature__box").forEach((element) => {
    element.querySelectorAll("button.feature-action").forEach((button) => {
      button.addEventListener("click", () => {
        console.log("click");
        const container = element.querySelector(".collapse-content");
        const targetBoxHeight = container.scrollHeight;
        const scaleImg = element.querySelector(".dial-mobile");
        const shrinkLines = element.querySelector(".dial-lines");
        const shrinkBg = element.querySelector(".dial-bg");

        if (scaleImg) {
          scaleImg.classList.toggle("scale-it");
        }
        if (shrinkBg) {
          shrinkBg.classList.toggle("shrink-it");
        }
        if (shrinkLines) {
          shrinkLines.classList.toggle("shrink-it");
        }

        button.classList.toggle("opened");
        container.classList.toggle("collapsed");
        if (container.hasAttribute("style")) {
          container.removeAttribute("style");
        } else {
          container.style.height = targetBoxHeight + "px";
        }
      });
    });
  });
});