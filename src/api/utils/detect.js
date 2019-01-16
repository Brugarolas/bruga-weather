const isTouchDevice = () => {
  return 'ontouchstart' in window
    || window.DocumentTouch && document instanceof window.DocumentTouch
    || navigator.maxTouchPoints
    || navigator.msMaxTouchPoints;
};

export default {
  isTouchDevice: isTouchDevice()
};
