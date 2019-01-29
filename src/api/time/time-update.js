import Task from '@/api/utils/task.js';
import ArrayUtils from '@/api/utils/array.js';
import counter from '@/api/utils/counter.js';

class TimeUpdate {
  constructor () {
    this.counter = counter();
    this.times = [];
    this.task = new Task(this.timer.bind(this), 5000);
  }

  addTime (date, callback) {
    const id = this.counter.next().value;
    this.times.push({ id, date, callback });

    if (this.times.length === 1) {
      this.task.start();
    }

    return id;
  }

  removeTime (id) {
    const removed = ArrayUtils.removeById(this.times, id);

    if (removed && this.times.length === 0) {
      this.task.stop();
    }
  }

  timer () {
    const now = Date.now();

    this.times.forEach(time => {
      time.date.timeUpdate(now);
      time.callback(time.date);
    });
  }
}

export default new TimeUpdate();
