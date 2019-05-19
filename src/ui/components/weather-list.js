import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getLocationsIds, hasLocationById } from '@/store/selectors/index.js';
import Detect from '@/api/utils/detect.js';
import FlipMove from 'react-flip-move';
import WeatherElement from '@/ui/containers/elements/weather-element.js';
import animations from '@/api/utils/animations.js';
import './weather-list.less';

const mapStateToProps = (state) => {
  return {
    weathersIds: getLocationsIds(state)
  }
}

class WeatherList extends PureComponent {
  constructor (props) {
    super(props);
  }

  get enterAnimation () {
    return animations.elevator;
  }

  get leaveAnimation () {
    return Detect.isTouchDevice ? animations.fade : animations.elevator;
  }

  render () {
    const { weathersIds } = this.props;
    const hasWeathers = weathersIds && weathersIds.length > 0;

    const weathers = hasWeathers ? weathersIds.map((weatherId) =>
      <li key={weatherId} className="weather-element">
        <WeatherElement weatherId={weatherId} />
      </li>
    ).filter(Boolean) : null;

    return (
      <FlipMove typeName="ul" className="weather-list"
        duration={350} staggerDurationBy={25} staggerDelayBy={25}
        enterAnimation={animations.elevator}
        leaveAnimation={animations.elevator}>
        { hasWeathers && weathers }
        <li key="children" className="weather-element">
          { this.props.children }
        </li>
      </FlipMove>
    );
  }
}

const ConnectedWeatherList = connect(mapStateToProps)(WeatherList);

export default ConnectedWeatherList;
