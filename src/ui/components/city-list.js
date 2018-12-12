import React from 'react';
import City from './city.js';
import './city-list.less';

const CityList = (props) => {
  if (!props.cities || !props.cities.length) return <></>;

  const cities = props.cities.map((city) =>
    <li key={city.id} className="city-element"><City city={city} onClick={props.clickCity} /></li>
  );

  return (
    <>
      <h4 className="city-list-title">Select city</h4>
      <ul className="city-list">{ cities }</ul>
    </>
  );
}

export default CityList;
