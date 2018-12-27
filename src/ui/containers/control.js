import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import ModalContainer from './modal/modal-container.js';
import Modal from './modal/modal.js';
import SearchCityForm from '@/ui/components/search-city-form.js';
import CityList from '@/ui/components/city-list.js';
import NewCityCard from '@/ui/components/new-city-card.js';
import OpenCities from '@/api/weather/cities.js';
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

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      cities: []
    });
  }

  searchCity = (cityName) => {
    OpenCities.searchCity(cityName).then(cities => {
      this.setState({
        cities: cities
      });
    });
  }

  selectCity = (city) => {
    const location = {
      id: city.id,
      callback: this.toggleModal
    }

    this.props.addLocation(location);
  }

  render () {
    return (
      <>
        <ModalContainer visible={this.state.modalVisible}>
          {
            this.state.modalVisible &&
            <Modal handleOnClose={this.toggleModal}>
              <SearchCityForm searchCity={this.searchCity} />
              <CityList cities={this.state.cities} clickCity={this.selectCity} />
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
