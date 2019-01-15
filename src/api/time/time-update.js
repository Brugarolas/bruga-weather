import counter from '@/api/utils/counter.js';

class TimeUpdate {
  constructor () {
    this.counter = counter();
    this.times = [];
  }

  addTime (date, callback) {
    let id = this.counter.next().value;
    this.times.push({ id, date, callback });

    if (this.times.length === 1) {
      this.startTimer();
    }

    return id;
  }

  removeTime (id) {
    let index = this.times.findIndex(time => time.id === id);
    if (index !== -1) {
      this.times.splice(index, 1);
    }

    if (this.times.length === 0) {
      this.stopTimer();
    }
  }

  timer () {
    const now = Date.now();

    this.times.forEach(time => {
      time.date.timeUpdate(now);
      time.callback(time.date);
    })
  }

  startTimer () {
    this.interval = setInterval(this.timer.bind(this), 5000);
  }

  stopTimer () {
    clearInterval(this.interval);
  }
}

export default new TimeUpdate();
