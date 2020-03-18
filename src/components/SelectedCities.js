import React from 'react';
import '../components/_LocationSearchInput.scss';

const SelectedCities = ({cities, removeCity, handleCityClick, addTraveler, removeTraveler, address}) => {


  return (
    <div className="cities-departure">
      {
        cities.map((city, index) => {
          return (
            <div key={index}>
              <div className="city-div">

                <div className="number-of-people-btn">

                  <button className="number-of-people" onClick={(event) => handleCityClick(event, city)}>
                      <i className="fas fa-user-friends fa-xs"></i>
                      <h6>{city.numberOfPeople}</h6>
                      <div className="chevron-up-down">
                        <i className="fas fa-chevron-down fa-xs"></i>
                      </div>
                  </button>

                  {city.showButton === true && (

                      <div className="people-number-change">
                        <button onClick={(event) => removeTraveler(event, city)}>
                          -
                        </button>

                        <button onClick={(event) => addTraveler(event, city)}>
                          +
                        </button>
                      </div>
                  )}

                </div>
                <div className="city-departure" key={index}>
                  <div className="city-departure-people">
                    <p>{city.name}</p>
                  </div>
                  <button className="remove-city-btn " onClick={(event) => removeCity(event, index)}><i className="fas fa-times-circle"></i></button>
                </div>

              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default SelectedCities;
