import Detect from './detect.js';
import PageVisibility from './pageVisibility.js';

/* Interval & Idle callback shim */
function startIdleInterval(task) {
  function fn() {
    task.requestId = window.requestIdleCallback(task.callback);
  }

  task.intervalId = window.setInterval(fn, task.interval);
}

function startInterval(task) {
  task.intervalId = window.setInterval(task.callback, task.interval);
}

function cancelIdleInterval(task) {
  window.cancelIdleCallback(task.requestId);
  window.clearInterval(task.intervalId);
}

function cancelInterval(task) {
  window.clearInterval(task.intervalId);
}

const startTask = Detect.hasIdleCallback ? startIdleInterval : startInterval;

const cancelTask = Detect.hasIdleCallback ? cancelIdleInterval : cancelInterval;

/* Task API */
class Task {
  constructor(callback, interval) {
    this.callback = callback;
    this.interval = interval;

    this.intervalId = undefined;
    this.requestId = undefined;
    this.visibilityEventsId = undefined;
    this.visibilityTimestamp = Date.now();
    this.started = false;
  }

  initializeVisibilityListeners() {
    if (this.visibilityEventsId) {
      return;
    }

    this.visibilityEventsId = PageVisibility.addListeners(
      this.onPageHide.bind(this),
      this.onPageShow.bind(this)
    );
  }

  stopVisibilitiListeners() {
    if (!this.visibilityEventsId) {
      return;
    }

    PageVisibility.removeListeners(this.visibilityEventsId);
    this.visibilityEventsId = undefined;
  }

  onPageShow() {
    this.startTask();
    const timeElapsed = Date.now() - this.visibilityTimestamp;

    if (timeElapsed > (this.interval / 2)) {
      this.callback();
    }
  }

  onPageHide() {
    this.stopTask();
    this.visibilityTimestamp = Date.now();
  }

  startTask() {
    if (this.started) {
      return;
    }

    this.started = true;
    startTask(this);
  }

  start() {
    this.startTask();
    this.initializeVisibilityListeners();
  }

  stopTask() {
    if (!this.started) {
      return;
    }

    this.started = false;
    cancelTask(this);
  }

  stop() {
    this.stopTask();
    this.stopVisibilitiListeners();
  }
}

export default Task;
