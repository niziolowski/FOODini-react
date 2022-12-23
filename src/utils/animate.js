export const animate = (target, animation) => {
  target.classList.remove(animation);
  void target.offsetWidth;
  target.classList.add(animation);
};
