import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { getLocationById } from '@/store/selectors/index.js';
import Time from '@/ui/containers/time.js';
import Icon from './icon.js';
import CancelButton from '@/ui/components/cancel-button.js';
import Actions from '@/store/actions/index.js';
import './weather.less';

const mapStateToProps = (state, props) => ({
  weather: getLocationById(state, props.weatherId)
});

const mapDispatchToProps = dispatch => {
  return {
    removeLocation: id => dispatch(Actions.removeLocation(id))
  };
};

class Weather extends PureComponent {
  constructor (props) {
    super(props);
  }

  click = () => {
    const { weatherId, removeLocation } = this.props;

    removeLocation({ id: weatherId });
  }

  render () {
    const { weather } = this.props;
    if (!weather) return (null);

    return (
      <article className='weather'>
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

        <CancelButton onClick={this.click} />
      </article>
    );
  }
}

const ConnectedWeather = connect(mapStateToProps, mapDispatchToProps)(Weather);

export default ConnectedWeather;
