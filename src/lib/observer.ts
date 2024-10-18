/**
 * Add an observer to animate an element on scroll
 * @param elementSelector HTML element selector
 * @param animationClass CSS class that reflects the animation final state
 * @param animationThreshold When start the animation once the element is on the screen
 */
export const addAnimationObserver = (
  elementSelector: string,
  animationClass: string,
  animationThreshold: number,
) => {
  const elementList = document.querySelectorAll(elementSelector);

  if (elementList) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
          }
        });
      },
      { threshold: animationThreshold },
    );

    elementList.forEach((el) => observer.observe(el));
  }
};
