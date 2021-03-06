import React from 'react';
import Calendar from 'react-calendar';
import './_DatesPicker.scss';
import onClickOutside from 'react-onclickoutside';

class DatesPicker extends React.Component {
  state = {
    showCalendar: false,
  };

  handleClickOutside = () => {
    this.setState({ showCalendar: false });
  };

  showOffCalendar = (props) => {
    this.setState({ showCalendar: false });
  };

  showOnCalendar = () => {
    this.setState({ showTravelTypeBtn: false });
    this.setState({ showStopTripBtn: false });
    this.setState({ showCalendar: true });
  };

  render() {
    return (
      <div className="datespicker">
        <div className="inputdate">
          <input
            className="inputdatefrom"
            type="text"
            onChange={this.props.onChange}
            onClick={this.showOnCalendar}
            placeholder="Departure date"
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
              placeholder="Return date"
              value={
                this.props.showDateTo && this.props.dateTo
                  ? this.props.dateTo.toLocaleDateString()
                  : ''
              }
            />
          ) : (
            <input
              className="inputdateto"
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
              showFixedNumberOfWeeks={false}
            />
            <button className="btn btn-date" onClick={this.showOffCalendar}>
              Ok
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(DatesPicker);
