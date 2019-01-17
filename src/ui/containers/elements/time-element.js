import React, { PureComponent } from 'react';
import TimezoneAPI from '@/api/time/timezone-api.js';
import TimezoneDate from '@/api/time/timezone-date.js';
import TimeUpdate from '@/api/time/time-update.js';

class Time extends PureComponent {
  constructor (props) {
    super(props);
    this.searchTimezone();
  }

  state = {
    hasTimezone: false
  }

  searchTimezone = () => {
    let { lat, lon } = this.props.location;
    if (!lat || !lon) return;

    TimezoneAPI.searchTimezone(lat, lon).then(response => {
      if (response.error) return;

      const date = new TimezoneDate(response);

      this.setState({
        hasTimezone: true,
        date: date.simpleTime()
      });

      this.timerId = TimeUpdate.addTime(date, (updatedDate) => {
        this.setState({
          date: updatedDate.simpleTime()
        });
      });
    });
  }

  componentWillUnmount() {
    TimeUpdate.removeTime(this.timerId);
  }

  render () {
    if (!this.state.hasTimezone) return (null);

    return (<div className={this.props.className}> { this.state.date } </div>)
  }
}

export default Time;
