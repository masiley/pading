import React from 'react';
import Calendar from 'react-calendar';
import './_DatesPicker.scss';
import onClickOutside from 'react-onclickoutside';

class DatesPicker extends React.Component {
  state = {
    showCalendar: false,
    showTravelTypeBtn: false,
    showStopTripBtn: false,
  };

  //ontravelTypeChange
  // reset datefrom and dateto
  // selectrange = true if "return" or = false if "one-way" --> OK
  // if "one-way", setState only datefrom and puts "no return" for inputdate return
  // if click on inputdate return, change travelType and reset datefrom and dateto

  handleClickOutside = () => {
    this.setState({ showCalendar: false });
    this.setState({ showTravelTypeBtn: false });
    this.setState({ showStopTripBtn: false });
  };

  showOffCalendar = (props) => {
    this.setState({ showCalendar: false });
  };

  showOnCalendar = () => {
    this.setState({ showTravelTypeBtn: false });
    this.setState({ showStopTripBtn: false });
    this.setState({ showCalendar: true });
  };

  showTravelTypeBtn = () => {
    this.setState({ showTravelTypeBtn: !this.state.showTravelTypeBtn });
  };

  showStopTripBtn = () => {
    this.setState({ showStopTripBtn: !this.state.showStopTripBtn });
  };

  switchTravelTypeBtn = (event) => {
    event.preventDefault();
    this.setState({ showCalendar: false });
    this.setState({ showStopTripBtn: false });
    this.setState({ showTravelTypeBtn: !this.state.showTravelTypeBtn });
  };

  switchStopTripBtn = (event) => {
    event.preventDefault();
    this.setState({ showCalendar: false });
    this.setState({ showTravelTypeBtn: false });
    this.setState({ showStopTripBtn: !this.state.showStopTripBtn });
  };

  render() {
    return (
      <div>
        <form className="simple_form search" action="/">
          <div className="travel-options">
            <div
              className="travel-options-details">
              <div className="travel-type">
                {this.state.showTravelTypeBtn ? (
                  <div className="travel-type-change">
                    <a
                      href="/"
                      onClick={(event) => {
                        this.props.switchToOneWay(event);
                        this.showTravelTypeBtn();
                      }}
                    >
                      <div className="check-box">
                        {this.props.travelType === 'One-way' ? (
                          <i className="fas fa-check fa-xl"></i>
                        ) : null}
                      </div>
                      <div className="one-way-return-div">
                        <h5>One-way</h5>
                      </div>
                    </a>

                    <a
                      href="/"
                      onClick={(event) => {
                        this.props.switchToReturn(event);
                        this.showTravelTypeBtn();
                      }}
                    >
                      <div className="check-box">
                        {this.props.travelType === 'Return' ? (
                          <i className="fas fa-check fa-xl"></i>
                        ) : null}
                      </div>
                      <div className="one-way-return-div">
                        <h5>Return</h5>
                      </div>
                    </a>
                  </div>
                ) : null}
                <button className="travel-type-btn" onClick={this.switchTravelTypeBtn}>
                  {this.props.travelType}

                  <div className="chevron-up-down">
                    <i className="fas fa-angle-down fa-lg"></i>
                  </div>
                </button>
              </div>

              <div className="stop-trip">
                {this.state.showStopTripBtn ? (
                  <div className="stop-trip-change">
                    <a
                      href="/"
                      onClick={(event) => {
                        this.props.switchToIndirect(event);
                        this.showStopTripBtn();
                      }}
                    >
                      <div className="check-box">
                        {this.props.stopTrip === 'All' ? (
                          <i className="fas fa-check fa-xs"></i>
                        ) : null}
                      </div>
                      <div className="stop-div">
                        <h5>All</h5>
                      </div>
                    </a>

                    <a
                      href="/"
                      onClick={(event) => {
                        this.props.switchToDirect(event);
                        this.showStopTripBtn();
                      }}
                    >
                      <div className="check-box">
                        {this.props.stopTrip === 'Direct' ? (
                          <i className="fas fa-check fa-xs"></i>
                        ) : null}
                      </div>
                      <div className="stop-div">
                        <h5>Direct</h5>
                      </div>
                    </a>
                  </div>
                ) : null}
                <button className="stop-trip-btn" onClick={this.switchStopTripBtn}>
                  {this.props.stopTrip}

                  <div className="chevron-up-down">
                    <i className="fas fa-angle-down fa-lg"></i>
                  </div>
                </button>
              </div>
            </div>

            <div className="inputdate">
              <input
                className="inputdatefrom"
                type="text"
                onChange={this.props.onChange}
                onClick={this.showOnCalendar}
                placeholder="Departure"
                value={
                  this.props.showDateFrom && this.props.dateFrom
                    ? this.props.dateFrom.toLocaleDateString()
                    : ''
                }
              />
              {this.props.travelType === 'Return' ? (
                <input
                  className="inputdateto"
                  type="text"
                  onChange={this.props.onChange}
                  onClick={this.showOnCalendar}
                  placeholder="Return"
                  value={
                    this.props.showDateTo && this.props.dateTo
                      ? this.props.dateTo.toLocaleDateString()
                      : ''
                  }
                />
              ) : (
                <input
                  className="inputdateto"
                  type="text"
                  onChange={this.props.onChange}
                  onClick={(event) => {
                    this.props.switchToReturn(event);
                    this.showOnCalendar();
                  }}
                  placeholder="no-return"
                  value="no-return"
                />
              )}
            </div>

            {this.state.showCalendar && (
              <div className="calendar">
                <Calendar
                  locale={'en'}
                  minDate={new Date()}
                  onClickOutside={this.handleClickOutside}
                  onChange={this.props.onChange}
                  selectRange={this.props.travelType === 'Return' ? true : false}
                  returnValue={'range'}
                />
                <button className="btn btn-date" onClick={this.showOffCalendar}>
                  Ok
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default onClickOutside(DatesPicker);
