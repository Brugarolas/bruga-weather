import Detect from './detect.js';
import ArrayUtils from './array.js';
import createCounter from './counter.js';

/* Variables */
const counter = createCounter();
const eventsOnHide = [];
const eventsOnShow = [];
let startedListeners = false;

/* Visibility functions */
function onHide() {
  eventsOnHide.forEach(event => { event.callback(); });
}

function onShow() {
  eventsOnShow.forEach(event => { event.callback(); });
}

function handleVisibilityChange() {
  if (document[Detect.visibilityHidden]) {
    onHide();
  } else {
    onShow();
  }
}

/* Listeners */
function startEventListener() {
  if (Detect.visibilitySupported && !startedListeners) {
    startedListeners = true;
    document.addEventListener(Detect.visibilityEvent, handleVisibilityChange, false);
  }
}

function stopEventListener() {
  if (Detect.visibilitySupported && startedListeners) {
    startedListeners = false;
    document.removeEventListener(Detect.visibilityEvent, handleVisibilityChange, false);
  }
}

/* API */
function addListeners(onHideListener, onShowListener) {
  const idListener = counter.next().value;

  eventsOnHide.push({
    id: idListener,
    callback: onHideListener
  });

  eventsOnShow.push({
    id: idListener,
    callback: onShowListener
  });

  if (eventsOnHide.length === 1 || eventsOnShow.length === 1) {
    startEventListener();
  }
}

function removeListeners(idListener) {
  const removedOnHide = ArrayUtils.removeById(eventsOnHide, idListener);
  const removedOnShow = ArrayUtils.removeById(eventsOnShow, idListener);

  if (eventsOnHide.length === 0 && eventsOnShow.length === 0 && (removedOnHide || removedOnShow)) {
    stopEventListener();
  }
}

export default { addListeners, removeListeners };
