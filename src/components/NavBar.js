import React from 'react';
import './_NavBar.scss';
import logo from '../img/logo.png';
import FormSearch from './FormSearch';
import Map from './Map';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class NavBarHome extends React.Component {
  state = {
    isHomePage: true,
    citiesFrom: this.props.searchData ? this.props.searchData.cities : [],
    address: '',
  };

  getFormattedCoordinate = (coordinates) => {
    coordinates.lat = coordinates.lat.toFixed(6);
    coordinates.lng = coordinates.lng.toFixed(6);
    return `${coordinates.lat}-${coordinates.lng}-50km`;
  };

  findCityIndex = (cityName, cities) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].name === cityName) {
        return i;
      }
    }
    return -1;
  };

  handleAddressChange = (address) => {
    this.setState({
      address: address,
    });

    const input = document.querySelector('.city-departure-input');
    input.addEventListener(
      'keydown',
      (event) => {
        const places = Array.from(
          event.target.parentElement.querySelectorAll('div[role="option"]')
        ).map((e) => e.innerText.trim().toLocaleLowerCase());

        if (event.key === 'Enter' && !places.includes(input.value.toLocaleLowerCase())) {
          if (0 < places.length) {
            input.value = places[0];
            this.setState({ address: places[0] });
          } else {
            event.stopPropagation();
            event.preventDefault();
          }
        }
      },
      true
    );
  };

  addCity = async (address) => {
    const position = await geocodeByAddress(address);
    const coordinates = await getLatLng(position[0]);
    const coordinatesFormatted = this.getFormattedCoordinate(coordinates);
    const cityName = position[0].address_components[0].long_name;
    const cities = [...this.state.citiesFrom];
    const cityIndex = this.findCityIndex(cityName, cities);

    if (cityIndex === -1) {
      //CREATE new city
      cities.push({
        name: cityName,
        lat: coordinates.lat,
        lng: coordinates.lng,
        coordinates: coordinatesFormatted,
        numberOfPeople: 1,
        showButton: false,
      });
    } else {
      //Add traveler
      cities[cityIndex].numberOfPeople++;
    }
    this.setState({
      citiesFrom: cities,
      address: '',
    });
  };

  removeCity = (event, index) => {
    event.preventDefault();
    const citiesFrom = [...this.state.citiesFrom];
    citiesFrom.splice(index, 1);
    this.setState({ citiesFrom });
  };

  render() {
    return (
      <div className="header">
        <div className="navbar">
          <div className="navbar-menu">
            <div className="navbar-brand">
              <a href="/">
                <img src={logo} alt="Pading find the perfect place to meet" />
              </a>
            </div>
          </div>
          <div className="value-prop">
            <h1>
              Trains and flights{' '}
              <div className="focus-text">
                <span className="green-underline"></span>combinations
              </div>{' '}
              for people traveling{' '}
              <div className="focus-text">
                <span className="blue-underline"></span>from multiple places
              </div>
            </h1>
            <p>
              <b>
                Enter your different departure cities, explore all common destinations to meet at
                the lowest fare
              </b>
            </p>
          </div>
        </div>

        <div className="form">
          <div className="formsearch">
            <FormSearch
              dateFrom={this.props.searchData ? this.props.searchData.dateFrom : ''}
              dateTo={this.props.searchData ? this.props.searchData.dateTo : ''}
              searchTrips={this.props.searchTrips}
              isLoading={this.props.isLoading}
              isHomePage={this.state.isHomePage}
              addCity={this.addCity}
              removeCity={this.removeCity}
              citiesFrom={this.state.citiesFrom}
              handleAddressChange={this.handleAddressChange}
              address={this.state.address}
            />
          </div>
          <div className="map">
            <Map
              citiesFrom={
                this.props.searchData ? this.props.searchData.cities : this.state.citiesFrom
              }
              citiesTo={
                this.props.searchData && this.props.searchData.destinationsWithPrice
                  ? this.props.searchData.destinationsWithPrice
                  : []
              }
              trips={this.props.trips}
              travelType={this.props.travelType}
            />
          </div>
        </div>
      </div>
    );
  }
}
