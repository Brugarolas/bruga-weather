import React from 'react';
import SwingComponent from '@/ui/containers/elements/swing-component.js';
import Time from '@/ui/containers/elements/time-element.js';
import Icon from './icon.js';
import CancelButton from '@/ui/components/cancel-button.js';
import './weather.less';

class Weather extends SwingComponent {
  constructor (props) {
    super(props);
  }

  onTrowOut = this.props.onClose.bind(undefined, true);

  render () {
    const { weather, onClose } = this.props;

    return (
      <article className='weather' ref={(weather) => { weather && this.addElement(weather) }}>
        <div className="column-1">
          <div className="name">{ weather.city } (<img className="flag" src={weather.flag} />)</div>
          <div className="desc">{ weather.main }</div>
          <Time className="desc" location={weather.location} />
        </div>

        <div className="column-2">
          <div className="weather-icon-wrapper">
            <Icon daytime={weather.daytime} weather={weather.descr} />
          </div>

          <div className="temp">
            <span className="units">{ weather.temp}</span>
            <span className="metrics">°C</span>
          </div>
        </div>

        <CancelButton onClick={onClose} />
      </article>
    );
  }
}

export default Weather;
