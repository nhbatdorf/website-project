let controller;
let slideScene;
let pageScene;

const colorOne = "#740467"; //Purple
const colorTwo = "#fa8f8f"; //Pink
const colorThree = "#85c4ae"; //Teal
const colorFour = "#391966"; //Royal Purple

function animateSlides() {
  controller = new ScrollMagic.Controller();
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-image");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addTo(controller);
  });
}

const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");

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
    gsap.to(".title", 1, { color: "#740467" });
    // gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Cook";
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title", 1, { color: "white" });
    // gsap.to(".title-swipe", 1, { y: "100%" });
    mouseTxt.innerText = " ";
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: colorFour });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: colorFour });
    gsap.to("#logo", 1, { color: colorFour });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: colorOne });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: colorOne });
    gsap.to("#logo", 1, { color: colorOne });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%" });
    document.body.classList.remove("hide");
  }
}

const logo = document.querySelector("#logo");

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        logo.href = "./index.html";
        logo.innerText = "Homegrown Olive";
      },
      beforeLeave() {
        controller.destroy();
      },
    },
    {
      namespace: "soup",
      beforeEnter() {
        logo.href = "../index.html";
        logo.innerText = "Homegrown Soup";
        animateSlides();
      },
      beforeLeave() {
        controller.destroy();
      },
    },
    {
      namespace: "pasta",
      beforeEnter() {
        logo.href = "../index.html";
        logo.innerText = "Homegrown Pasta";
        animateSlides();
      },
      beforeLeave() {
        controller.destroy();
      },
    },
    {
      namespace: "desert",
      beforeEnter() {
        logo.href = "../index.html";
        logo.innerText = "Homegrown Desert";
        animateSlides();
      },
      beforeLeave() {
        controller.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();

        window.scrollTo(0, 0);
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },
          { x: "100%", stagger: 0.2, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      },
    },
  ],
});

burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

console.log(logo.innerText);
