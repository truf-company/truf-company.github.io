// Slider
const swiper = new Swiper(".review-slider", {
  loop: true,
  autplay: true,
  spaceBetween: 25,
  speed: 1200,
  navigation: {
    nextEl: ".btn-right",
    prevEl: ".btn-left",
  },
});

//   Accordion
function openAccordion(id, event) {
  let targetParent = document.querySelector(id);
  let targetBox = targetParent.querySelector(".collapse-content");
  let targetBoxHeight = targetBox.scrollHeight;
  let scaleImg = targetParent.querySelector(".dial-mobile");
  let shrinkLines = targetParent.querySelector(".dial-lines");
  let shrinkBg = targetParent.querySelector(".dial-bg");
  let currentTarget = event.target.closest(".link");

  if (scaleImg) {
    scaleImg.classList.toggle("scale-it");
  }
  if (shrinkBg) {
    shrinkBg.classList.toggle("shrink-it");
  }
  if (shrinkLines) {
    shrinkLines.classList.toggle("shrink-it");
  }

  currentTarget.classList.toggle("opened");
  targetBox.classList.toggle("collapsed");
  if (targetBox.hasAttribute("style")) {
    targetBox.removeAttribute("style");
  } else {
    targetBox.style.height = targetBoxHeight + "px";
  }
}
