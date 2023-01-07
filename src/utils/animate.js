export const animate = (target, animation) => {
  // all animations array
  const animations = [
    "pulsate",
    "shake",
    "rotate",
    "bounce",
    "spin",
    "vibrate",
  ];
  // Clear all animations
  animations.forEach((animation) => target.classList.remove(animation));
  void target.offsetWidth;
  target.classList.add(animation);
};
