import axios from 'axios';
import lodash from 'lodash';
import { history } from '../index';
import moment from 'moment';

const getPriceForDestination = (trips, destination, city) => {
  let tripsForDestination = trips[city].filter((trip) => {
    return trip.cityTo === destination;
  });
  let prices = tripsForDestination.map((trip) => {
    return trip.price;
  });
  return Math.min.apply(null, prices);
};

const getTotalPrice = (trips, destination) => {
  const pricesList = [];
  let totalPrice = 0;
  Object.keys(trips).forEach((city) => {
    const price = getPriceForDestination(trips, destination, city);
    totalPrice += price;
    pricesList.push({ city: city, price: price });
  });

  return {
    pricesPerDepartureCity: pricesList,
    totalPrice: totalPrice,
  };
};

const compare = (a, b) => {
  if (a.totalPrice < b.totalPrice) {
    return -1;
  }
  if (a.totalPrice > b.totalPrice) {
    return 1;
  }
  return 0;
};

const getWayRoutes = (routes, cityTo) => {
  const wayRoutes = [];
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].cityFrom === cityTo) {
      break;
    }
    wayRoutes.push(routes[i]);
  }
  return wayRoutes;
};

const getReturnRoutes = (routes, cityTo) => {
  const arrivalRoutes = [];
  for (let i = routes.length - 1; i >= 0; i--) {
    if (routes[i].cityTo === cityTo) {
      break;
    }
    arrivalRoutes.push(routes[i]);
  }
  return arrivalRoutes.reverse();
};

const getLocalDepartureDate = (arrivalRoutes) => {
  return arrivalRoutes[arrivalRoutes.length - 1].local_departure;
};

const getLocalArrivalDate = (arrivalRoutes) => {
  return arrivalRoutes[arrivalRoutes.length - 1].local_arrival;
};

const getCommonDestinations = (trips, cities) => {
  //Recuperer une liste des destinations communes
  let commonTrips = [];
  if (cities.length === 1 && cities[0].name in trips) {
    commonTrips = trips[cities[0].name];
  } else {
    for (let i = 1; i < cities.length; i++) {
      let city1 = cities[i - 1].name;
      let city2 = cities[i].name;
      if (commonTrips.length > 0) {
        commonTrips = lodash.intersectionBy(commonTrips, trips[city2], 'cityTo');
      } else {
        commonTrips = lodash.intersectionBy(trips[city1], trips[city2], 'cityTo');
      }
    }
  }
  let commonDestinations = [];
  for (let i = 0; i < commonTrips.length; i++) {
    if (!commonDestinations.includes(commonTrips[i].cityTo)) {
      commonDestinations.push(commonTrips[i].cityTo);
    }
  }
  //Retirer les voyages qui ne font pas parti des destinations communes
  for (let i = 0; i < cities.length; i++) {
    let city = cities[i].name;
    if (city in trips) {
      trips[city] = trips[city].filter((trip) => {
        return commonDestinations.includes(trip.cityTo);
      });
    }
  }
  const destinations = [];
  for (let i = 0; i < commonDestinations.length; i++) {
    const prices = getTotalPrice(trips, commonDestinations[i]);
    destinations.push({
      name: commonDestinations[i],
      ...prices,
      carbonFootprint: i,
    });
  }
  destinations.sort(compare);
  return destinations;
};

export const searchTrips = (cities, dateFrom, dateTo, stopTrip, travelType) => {
  const promises = [];
  return (dispatch) => {
    const formData = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      cities: cities,
    };
    // dispatch({ type: 'CLEAR_SEARCH' });
    dispatch({ type: 'FORM_DATA', formData });
    dispatch({ type: 'LOADING' });
    history.push('/results');

    // To calculate the time difference of two dates
    const differenceInTime = dateTo.getTime() - dateFrom.getTime();
    // To calculate the no. of days between two dates
    const differenceInDays = Math.trunc(differenceInTime / (1000 * 3600 * 24));
    const dateFromStr = dateFrom.toLocaleDateString();
    const dateToStr = dateTo.toLocaleDateString();

    let maxStopover = '2';
    if (stopTrip === 'Only direct') {
      maxStopover = '0';
    }
    let config = {
      headers: {
        accept: 'application/json',
        apikey: 'OZKMONJlN0ntClVlOy1Qv7dXRC4btk4f',
      },
    };

    const travelers = {};
    for (let i = 0; i < cities.length; i++) {
      travelers[cities[i].name] = cities[i].numberOfPeople;
      let promise;
      if (travelType === 'Return') {
        promise = axios.get(
          `https://tequila-api.kiwi.com/v2/search?fly_from=${cities[i].coordinates}&date_from=${dateFromStr}&date_to=${dateFromStr}&return_from=${dateToStr}&return_to=${dateToStr}&max_stopovers=${maxStopover}&flight_type=round&nights_in_dst_from=${differenceInDays}&nights_in_dst_to=${differenceInDays}&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft&ret_to_diff_airport=0&ret_from_diff_airport=0`,
          config
        );
      } else {
        promise = axios.get(
          `https://tequila-api.kiwi.com/v2/search?fly_from=${cities[i].coordinates}&date_from=${dateFromStr}&date_to=${dateFromStr}&max_stopovers=${maxStopover}&flight_type=oneway&adults=${cities[i].numberOfPeople}&vehicle_type=aircraft`,
          config
        );
      }

      promises.push(promise);
    }

    Promise.all(promises)
      .then((results) => {
        const trips = {};
        //Construction d'un objet avec une liste de voyage
        for (let i = 0; i < results.length; i++) {
          if (typeof results[i].data.data[0] !== 'undefined') {
            const city = results[i].data.data[0].cityFrom;
            const trips_by_city = results[i].data.data.map((trip) => {
              const padingTrip = {
                cityFrom: trip.cityFrom,
                cityTo: trip.cityTo,
                price: trip.price,
                way: { local_departure: trip.local_departure, local_arrival: trip.local_arrival },
                return: {},
                wayRoutes: getWayRoutes(trip.route, trip.cityTo),
                returnRoutes: [],
                nightsInDest: trip.nightsInDest,
                duration: trip.duration,
                travelers: travelers[trip.cityFrom],
                token: trip.booking_token,
              };
              if (travelType === 'Return') {
                const returnRoutes = getReturnRoutes(trip.route, trip.cityTo);
                padingTrip['returnRoutes'] = returnRoutes;
                padingTrip['return']['local_departure'] = getLocalDepartureDate(returnRoutes);
                padingTrip['return']['local_arrival'] = getLocalArrivalDate(returnRoutes);
              }
              return padingTrip;
            });
            trips[city] = trips_by_city;
          }
        }
        //TODO
        const commonDestinations = getCommonDestinations(trips, cities);

        const data = {
          commonDestinations: commonDestinations,
          initialTrips: trips,
          trips,
          travelers,
          travelType,
        };
        dispatch({ type: 'SEARCH', data });
        dispatch({ type: 'SUCCESS' });
      })
      .catch((error) => {
        dispatch({ type: 'FAILURE' });
      });
  };
};

export const doFilter = (fullFilter, trips, a, departureCities) => {
  console.log(fullFilter);
  //TODO update full filter to
  return (dispatch) => {
    const filterTypes = Object.keys(fullFilter);
    filterTypes.forEach(function (filterType) {
      console.log(filterType);
      if (filterType === 'departure') {
        console.log('departure filter');
        console.log(fullFilter.departure);
        const cities = Object.keys(fullFilter.departure);
        // console.log(cities);
        for (const city of cities) {
          let trips_by_city = trips[city];
          trips_by_city = trips_by_city.filter((trip) => {
            if (
              moment.utc(trip.way.local_departure).hours() >= fullFilter.departure[city].start &&
              moment.utc(trip.way.local_departure).hours() <= fullFilter.departure[city].end
            ) {
              return true;
            }
            return false;
          });
          console.log(trips_by_city);
          trips[city] = trips_by_city;
        }
      }
      // if (
      //   filterType === 'return' &&
      //   'start' in fullFilter.return[city] &&
      //   'end' in fullFilter.return[city]
      // ) {
      //   trips_by_city = trips_by_city.filter((trip) => {
      //     console.log('return filter');
      //     if (
      //       moment.utc(trip.return.local_arrival).hours() >= fullFilter.return[city].start &&
      //       moment.utc(trip.return.local_arrival).hours() <= fullFilter.return[city].end
      //     ) {
      //       return true;
      //     }
      //     return false;
      //   });
      // }
    });
    console.log(a);
    const commonDestinations = getCommonDestinations(trips, a);

    const data = {
      commonDestinations,
      trips,
    };
    dispatch({ type: 'FILTER', data });
  };
};
