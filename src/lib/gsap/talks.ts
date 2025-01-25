import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const createTalksAnimations = () => {
  gsap.to(".talks__slider > h2 > span", {
    xPercent: -100,
    duration: 4,
    ease: "none",
    repeat: -1,
  });

  gsap.from(".talks__container > div", {
    autoAlpha: 0,
    y: 50,
    ease: "back.out",
    duration: 2,
    scrollTrigger: ".talks__container",
    top: "top bottom",
    stagger: 0.5,
  });
};

export default createTalksAnimations;
