import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import ModalContainer from './modal/modal-container.js';
import Modal from './modal/modal.js';
import SearchCityForm from '@/ui/components/search-city-form.js';
import NewCityCard from '@/ui/components/new-city-card.js';
import OpenWeather from '@/api/weather/openweather.js';
import Actions from '@/store/actions/index.js';

const mapDispatchToProps = dispatch => {
  return {
    addLocation: location => dispatch(Actions.addLocation(location))
  };
};

class Control extends PureComponent {
  constructor (props) {
    super(props);
  }

  state = {
    modalVisible: false
  }

  toggleModal = (media) => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  searchCity = (cityName) => {
    OpenWeather.searchCity(cityName).then((weather) => {
      if (!weather.error) {
        this.setState({
          modalVisible: !this.state.modalVisible
        });
        this.props.addLocation(weather);
      }
    });
  }

  addWeatherLocation = (cityName) => {
    OpenWeather.searchCity(cityName).then((weather) => {
      this.props.addLocation(weather);
    });
  }

  componentWillMount() {
    /* this.addWeatherLocation('Madrid');
    this.addWeatherLocation('London');
    this.addWeatherLocation('Barcelona');
    this.addWeatherLocation('Paris');
    this.addWeatherLocation('Osaka');
    this.addWeatherLocation('Anchorage');
    this.addWeatherLocation('Buenos Aires');
    this.addWeatherLocation('Moscow');
    this.addWeatherLocation('Tokyo'); */
  }

  render () {
    return (
      <>
        <ModalContainer visible={this.state.modalVisible}>
          {
            this.state.modalVisible &&
            <Modal handleOnClose={this.toggleModal}>
              <SearchCityForm searchCity={this.searchCity} />
            </Modal>
          }
        </ModalContainer>
        <NewCityCard onClick={this.toggleModal} />
      </>
    );
  }
}

const ConnectedControl = connect(undefined, mapDispatchToProps)(Control);

export default ConnectedControl;
