import React from 'react';
import './city.less';

const once = (func) => {
  var times = 0;
  return () => {
    if (++times === 1) {
      return func.apply(this, arguments);
    }
  };
}

const City = (props) => {
  const { city } = props;

  const click = once((event) => {
    props.onClick(city);
  });

  return (
    <article className='city' onClick={click}>
      <div className="column-1">
        <div className="name">{ city.name } (<img className="flag" src={city.flag} />)</div>
        <div className="descr">{ city.main }</div>
      </div>
      <div className="column-2">
        <div className="temp">
          <span className="units">{ city.temp}</span>
          <span className="metrics">°C</span>
        </div>
      </div>
    </article>
  );
}

export default City;
