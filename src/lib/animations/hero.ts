import gsap from "gsap";
import SplitType from "split-type";

const backgroundTimeline = () => {
  const timeline = gsap.timeline({
    defaults: {
      autoAlpha: 0.1,
      duration: 1,
      ease: "back.Out",
    },
  });

  timeline.fromTo(
    ".hero__grid-left > img",
    { autoAlpha: 0, x: -100 },
    {
      x: 0,
      stagger: {
        amount: 2,
        from: "end",
      },
    },
  );

  timeline.fromTo(
    ".hero__grid-right > img",
    { autoAlpha: 0, x: 100 },
    {
      x: 0,
      stagger: {
        amount: 2,
        from: "start",
      },
    },
    "<",
  );

  return timeline;
};

const textTimeline = () => {
  new SplitType(".hero__header");

  const timeline = gsap.timeline();

  timeline.from(".hero__header .char", {
    duration: 1.5,
    opacity: 0,
    scale: 0,
    y: 80,
    rotationX: 180,
    transformOrigin: "0% 50% -50",
    ease: "back",
    stagger: 0.05,
    delay: 0.8,
  });

  timeline.from(
    ".hero__description",
    {
      autoAlpha: 0,
      y: -100,
      duration: 0.8,
      ease: "back",
    },
    "<1.2",
  );

  return timeline;
};

const buttonTimeline = () => {
  const timeline = gsap.timeline();

  timeline.from("#hero > .content-layout > div > div > div > a", {
    autoAlpha: 0,
    y: 100,
    duration: 1.5,
    ease: "back",
    stagger: 0.2,
  });

  return timeline;
};

const createHeroAnimations = () => {
  const master = gsap.timeline();

  master.add(backgroundTimeline());

  // Animate the spheres in the background
  master.from(".hero__sphere-container > img", {
    autoAlpha: 0,
    y: -100,
    duration: 1.5,
    ease: "back.out",
    stagger: 0.1,
  });

  master.add(textTimeline(), "<-1");
  master.add(buttonTimeline(), ">-1.5");

  // Animate the header logo
  master.from(
    ".header-layout > img",
    {
      autoAlpha: 0,
      duration: 1.5,
      ease: "back.Out",
    },
    "<0.5",
  );
};

export default createHeroAnimations;
