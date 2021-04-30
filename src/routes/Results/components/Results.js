import React from 'react';
import NavBar from '../../../components/NavBar';
import './_Results.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import TripCard from './TripCard';
import Filter from './Filter';
import TripCardSkeleton from './TripCardSkeleton';
import Popup from 'reactjs-popup';
import DetailsResultsPopup from './DetailsResultsPopup';

export default function Result(props) {
  const [showFilter, setShowFilter] = React.useState(false);
  const [departureFilter, setDepartureFilter] = React.useState({});
  const [returnFilter, setReturnFilter] = React.useState({});

  const displayFilter = () => {
    setShowFilter(!showFilter);
  };

  const doFilter = (filter, city, type) => {
    const trips = { ...props.search.initialTrips };
    const fullFilter = {
      departure: departureFilter,
      return: returnFilter,
    };

    if (type === 'departure') {
      setDepartureFilter({
        start: filter[0],
        end: filter[1],
      });
      fullFilter['departure'] = departureFilter;
    }
    if (type === 'return') {
      setReturnFilter({
        start: filter[0],
        end: filter[1],
      });
      fullFilter['return'] = returnFilter;
    }

    props.doFilter(
      fullFilter,
      trips,
      props.search.cities,
      city,
      props.search.initialDestinationsWithPrice
    );
  };

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
      pricesPerDestination: pricesList,
      totalPrice: totalPrice,
    };
  };

  return (
    <div>
      <NavBar
        isLoading={props.search.isLoading}
        searchTrips={props.searchTrips}
        searchData={props.search}
        trips={props.search.trips}
        travelType={props.search.travelType}
      />
      <div className="travel-results" id="travel-results">
        <div className="travel-results-cards">
          <div className="linear-progress-filter">
            <div className="linear-progress-div">
              {props.search.isLoading && (
                <div className="linear-progress">
                  <LinearProgress />
                </div>
              )}
            </div>
            <button className="btn-filter" onClick={displayFilter}>
              Filter
            </button>
            <i className="fas fa-sort-amount-down-alt fa-lg"></i>
          </div>
          {showFilter ? (
            <div className="filter-div">
              <div className="filter-table">
                <div className="filter-table-header">
                  <div className="filter-table-header-city"></div>
                  <div className="filter-table-header-departure">
                    <p>Departure time</p>
                  </div>
                  {props.search.travelType === 'Return' ? (
                    <div className="filter-table-header-return">
                      <p>Return time</p>
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="filter-table-body">
                  {props.search &&
                    props.search.cities.map((city, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="filter-table-body-city">
                            <p>{city.name}</p>
                          </div>
                          <div className="filter-table-body-departure">
                            <Filter filter={doFilter} city={city.name} type="departure" />
                          </div>
                          {props.search.travelType === 'Return' ? (
                            <div className="filter-table-body-return">
                              <Filter filter={doFilter} city={city.name} type="return" />
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <div id="cards-results-wrapper">
            {props.search.isLoading ? (
              <div className="cards-results" id="cards-results">
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
                <TripCardSkeleton />
              </div>
            ) : (
              <div className="cards-results" id="cards-results">
                {props.search.commonDestinations.map((destination, index) => {
                  return (
                    <div className={index} key={index}>
                      <Popup
                        modal
                        trigger={
                          <div>
                            <TripCard
                              destination={destination}
                              prices={getTotalPrice(props.search.trips, destination)}
                              travelers={props.search.travelers}
                              key={index}
                            />
                          </div>
                        }
                        key={index}
                      >
                        <DetailsResultsPopup
                          destination={destination}
                          trips={props.search.trips}
                          key={index}
                          travelType={props.search.travelType}
                        />
                      </Popup>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
