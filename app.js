let controller;
let slideScene;
let pageScene;
let localMode = "sun";

const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const mode = document.querySelector(".mode");
const burger = document.querySelector(".burger");
const blogPost = document.querySelectorAll(".large");
const logo = document.querySelector("#logo");

const darkTextOne = "#600f0b"; //Red
const lightText = "#cdecfe"; //Blue
const colorTwo = "#f8e2e9"; //Pink
const darkBack = "#261b36"; //Purple
const lightBack = "#e6fef1"; //Teal
const darkTextTwo = "#065633"; //Green

function animateSlides() {
  controller = new ScrollMagic.Controller();
  const sliders = document.querySelectorAll(".slide");

  getLocal();
  setMode(localMode);

  const pageTl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
  });
  pageTl.fromTo(".swipe", 0.75, { x: "-100%" }, { x: "0%" });
  pageTl.fromTo(".swipe", 0.75, { x: "0%" }, { x: "100%", stagger: 0.2 });

  pageScene = new ScrollMagic.Scene({
    reverse: false,
  })
    .setTween(pageTl)
    .addTo(controller);

  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-image");
    const img = slide.querySelector("img");

    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addTo(controller);
  });
}

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("large")) {
    mouse.classList.add("explore-active");
    mouseTxt.innerText = "Let's Cook";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = " ";
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: darkTextTwo });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: darkTextTwo });
    gsap.to("#logo", 1, { color: darkTextTwo });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: darkTextOne });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: darkTextOne });
    gsap.to("#logo", 1, { color: darkTextOne });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%" });
    document.body.classList.remove("hide");
  }
}

function setMode() {
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const body = document.body.style;

  if (localMode === "moon") {
    mode.classList.add("moon");
    mode.classList.remove("sun");
    mode.src = "../img/moon.png";
    body.background = darkBack;
    body.color = lightText;
    logo.style.color = lightText;
    line1.style.background = lightText;
    line2.style.background = lightText;
    localMode = "moon";
  } else {
    mode.classList.add("sun");
    mode.classList.remove("moon");
    mode.src = "../img/sun.png";
    body.background = lightBack;
    body.color = darkTextOne;
    logo.style.color = darkTextOne;
    line1.style.background = darkTextOne;
    line2.style.background = darkTextOne;
    localMode = "sun";
  }
}

function modeToggle() {
  getLocal();
  if (localMode === "sun") {
    localMode = "moon";
  } else {
    localMode = "sun";
  }
  setMode();
  localStorage.setItem("mode", JSON.stringify(localMode));
}

function getLocal() {
  if (localStorage.getItem("mode") === null) {
    localMode = "sun";
  } else {
    localMode = JSON.parse(localStorage.getItem("mode"));
  }
}

burger.addEventListener("click", navToggle);
mode.addEventListener("click", modeToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
