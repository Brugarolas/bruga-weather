import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import WeatherList from '@/ui/components/weather-list.js';
import ModalContainer from './modal/modal-container.js';
import Modal from './modal/modal.js';
import SearchCityForm from '@/ui/components/search-city-form.js';
import CityList from '@/ui/components/city-list.js';
import NewCityCard from '@/ui/components/new-city-card.js';
import OpenCities from '@/api/weather/cities.js';
import Actions from '@/store/actions/index.js';
import Detect from '@/api/utils/detect.js';
import counter from '@/api/utils/counter.js';

const mapDispatchToProps = dispatch => {
  return {
    addLocation: location => dispatch(Actions.addLocation(location))
  };
};

class Home extends PureComponent {
  constructor (props) {
    super(props);
    this.counter = counter();
  }

  state = {
    modalVisible: false,
    searching: false,
    lastSearch: '',
    cities: [],
    error: false
  }

  closeModal = () => {
    if (!this.state.modalVisible) return;

    this.setState({
      modalVisible: false,
      lastSearch: '',
      cities: [],
      error: false
    });
  }

  openModal = () => {
    if (this.state.modalVisible) return;

    this.setState({
      modalVisible: true,
      modalKey: this.counter.next().value
    });
  }

  searchCity = (cityName) => {
    if (this.state.searching || this.state.lastSearch === cityName) {
      return;
    }

    this.setState({
      searching: true,
      lastSearch: cityName
    });

    OpenCities.searchCity(cityName).then(response => {
      this.setState({
        cities: response.error ? [] : response,
        searching: false,
        error: response.error
      });

      if (Detect.isTouchDevice && !response.error && response.length) {
        setTimeout(() => { document.activeElement.blur(); });
      }
    });
  }

  selectCity = (city) => {
    const location = {
      id: city.id,
      callback: this.closeModal
    }

    this.props.addLocation(location);
  }

  render () {
    return (
      <>
        <WeatherList>
          <NewCityCard onClick={this.openModal} />
        </WeatherList>

        <ModalContainer visible={this.state.modalVisible} exit={this.closeModal}>
          {
            this.state.modalVisible &&
            <Modal key={this.state.modalKey} handleOnClose={this.closeModal}>
              <SearchCityForm searchCity={this.searchCity}
                isSearching={this.state.searching} hasError={this.state.error} />
              <CityList cities={this.state.cities} clickCity={this.selectCity} />
            </Modal>
          }
        </ModalContainer>
      </>
    );
  }
}

const ConnectedHome = connect(undefined, mapDispatchToProps)(Home);

export default ConnectedHome;
