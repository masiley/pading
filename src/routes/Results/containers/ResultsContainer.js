import { connect } from 'react-redux';
import Results from '../components/Results';
import { searchTrips, doFilter, clickOnFilter } from '../../../actions';

const mapStateToProps = ({ search, app }, ownProps) => {
  return {
    search,
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchTrips: (cities, dateFrom, dateTo, stopTrip, travelType) =>
    dispatch(searchTrips(cities, dateFrom, dateTo, stopTrip, travelType)),
  doFilter: (filter, trips, cities, city) => dispatch(doFilter(filter, trips, cities, city)),
  clickOnFilter: (showFilter) => dispatch(clickOnFilter(showFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
