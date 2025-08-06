function scrollToElement(elementId: string) {
  const target = document.getElementById(elementId);
  const y = target!.getBoundingClientRect().top + window.scrollY; // 8px = 1rem
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default scrollToElement;
