const twoDigits = (number) => number < 10 ? '0' + number : number;

class TimezoneDate extends Date {
  constructor (timezone) {
    super();

    this.diffTimezoneOffset = this.getTimezoneOffset() - timezone.offset;
    this.addMinutes(this.diffTimezoneOffset);

    this.timezone = timezone.timezone;
    this.timezoneOffset = timezone.offset;
  }

  timeUpdate (timestamp) {
    this.setTime(timestamp + this.diffTimezoneOffset * 60000); // 1000 * 60
  }

  addMinutes(minutes) {
    if (minutes !== 0) {
      this.setTime(this.getTime() + minutes * 60000); // 1000 * 60
    }
  }

  simpleTime() {
    let hours = twoDigits(this.getHours());
    let minutes = twoDigits(this.getMinutes());
    return `${hours}:${minutes}`;
  }

  getTimezoneOffset () {
    return this.timezoneOffset || super.getTimezoneOffset();
  }
}

export default TimezoneDate;
