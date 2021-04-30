import React from 'react';
import ReactDOM from 'react-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocode from 'react-geocode';
import './_Map.scss';
import yellowMarker from '../img/yellow-marker.png';
import Popup from 'reactjs-popup';
import DetailsResultsPopup from '../routes/Results/components/DetailsResultsPopup';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

Geocode.setApiKey(API_KEY);

export default class Map extends React.Component {
  state = {
    viewport: {
      height: '100%',
      width: '100%',
      latitude: 48.856614,
      longitude: 4.352222,
      minZoom: 3,
      interactive: true,

      iconAllowOverlap: false,
    },
    destinations: [],
    openPopup: '',
  };

  test = (cityName) => {
    this.setState({ openPopup: cityName });
  };

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1IjoibG91aXMxNDA0IiwiYSI6ImNrNm0zOGFkMDBqdG8zZXA3NGR5ejhzYnQifQ.Yt9WzWg8hdm6b9h5k5sxHw"
          mapStyle="mapbox://styles/louis1404/ck6m5f35i0ucc1impooorg2qu"
          onViewportChange={(viewport) => this.setState({ viewport })}
          width="dummyValue"
          onClick={this.handleClick}
        >
          {this.props.citiesFrom.map((city) => (
            <Marker
              className="marker-departure-city"
              key={city.name}
              latitude={parseFloat(city.lat)}
              longitude={parseFloat(city.lng)}
            >
              <img src={yellowMarker} alt="Departure city" />
            </Marker>
          ))}
          {console.log('is loading is ' + this.props.isLoading)}
          {this.props.citiesTo.map((city) => (
            <div key={city.name}>
              <Marker
                className="marker-destination"
                key={city.name}
                latitude={parseFloat(city.lat)}
                longitude={parseFloat(city.lng)}
              >
                <button
                  className="marker-destination-btn"
                  onClick={() => this.test(city.name)}
                ></button>
                <button className="destination-price" onClick={() => this.test(city.name)}>
                  {city.name} {city.prices.totalPrice}€
                </button>
              </Marker>
            </div>
          ))}
        </ReactMapGL>
        {this.props.citiesTo.map((city) =>
          ReactDOM.createPortal(
            <div>
              <Popup modal open={true}>
                <DetailsResultsPopup
                  destination={city.name}
                  trips={this.props.trips}
                  key={city.name}
                  travelType={this.props.travelType}
                />
              </Popup>
            </div>,
            document.getElementById('cards-results')
          )
        )}
      </div>
    );
  }
}
