import React, { Component } from 'react';
import './search-city-form.less';

class SearchCityForm extends Component {
  constructor (props) {
    super(props);
  }

  state = {
    cityName: ''
  }

  handleChangeCity = (event) => {
    this.setState({cityName: event.target.value});
  }

  searchCity = (event) => {
    event.preventDefault();
    if (this.state.cityName) {
      this.props.searchCity(this.state.cityName);
    }
  }

  render () {
    return (
      <form className="search-form" onSubmit={this.searchCity}>
        <h4 className="title">
          Add weather forecast for a new location
        </h4>
        <div className="search-box">
          <input className="input-search" type="text" value={this.state.cityName} onChange={this.handleChangeCity} />
          <button className="button-search" type="submit">
            <i className="fas fa-search icon" />
            <span>Search</span>
          </button>
        </div>
      </form>
    );
  }
}

export default SearchCityForm;
