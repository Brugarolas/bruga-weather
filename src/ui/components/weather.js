import React from 'react';
import SwingComponent from '@/ui/containers/elements/swing-component.js';
import clsx from 'clsx';
import Time from '@/ui/containers/elements/time-element.js';
import Icon from './icon.js';
import CancelButton from '@/ui/components/cancel-button.js';
import Forecast from './weather-forecast.js';
import './weather.less';

const ANIMATION_DURATION = 500; // ms

class Weather extends SwingComponent {
  constructor (props) {
    super(props);
    this.onTrowOut = this.props.onClose;
    this.previouslySelected = false;
    this.showExtraInfo = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const animateExtraInfo = !nextProps.selected && this.previouslySelected;

    if (animateExtraInfo) {
      setTimeout(() => {
        this.showExtraInfo = false;
        this.forceUpdate();
      }, ANIMATION_DURATION + 10);
    } else {
      this.showExtraInfo = nextProps.selected;
    }

    this.previouslySelected = nextProps.selected;
    return true;
  }

  click = () => {
    const { onClick } = this.props;
    onClick && onClick();
  }

  render () {
    const { weather, onClose, showCancelButton, selected, forecast } = this.props;
    const classNames = clsx('weather', selected && 'weather__selected');

    return (
      <article className={classNames} ref={(weather) => { weather && this.addElement(weather); }} onClick={this.click}>
        <div className='main-info'>
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
        </div>

        { showCancelButton && <CancelButton onClick={onClose} /> }

        { this.showExtraInfo && (<div className='extra-info'><Forecast forecast={forecast} /></div>)}
      </article>
    );
  }
}

export default Weather;
