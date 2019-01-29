const isTouchDevice = () => {
  return 'ontouchstart' in window
    || window.DocumentTouch && document instanceof window.DocumentTouch
    || navigator.maxTouchPoints
    || navigator.msMaxTouchPoints;
};

let hidden, visibilityChange; // Set the name of the hidden property and the change event for visibility
if (document.hidden !== undefined) { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (document.msHidden !== undefined) {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (document.webkitHidden !== undefined) {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

export default {
  isTouchDevice: isTouchDevice(),
  hasIdleCallback: 'requestIdleCallback' in window,
  visibilitySupported: document.addEventListener !== undefined && hidden !== undefined,
  visibilityHidden: hidden,
  visibilityEvent: visibilityChange
};
