import gsap from "gsap";

export const rotate = (elementClass: string) => {
  gsap
    .to(elementClass, { rotation: 360, duration: 10, ease: "none" })
    .repeat(-1);
};
