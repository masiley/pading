import React from 'react';
import Calendar from 'react-calendar';
import './_DatesPicker.scss';
import onClickOutside from 'react-onclickoutside';

class DatesPicker extends React.Component {
  state = {
    date: [],
    firstClick: true,
    showdate: false,
    showcalendar: false,
  };

  handleClickOutside = () => {
  this.setState({showcalendar: false })
  console.log('onClickOutside() method called')

}

  onChange = date => {
    console.log(this.state.date);
    this.setState({ date });
    console.log(this.state.date);
    this.setState({ showdate: true });
  };

  showoff = () => {
    this.setState({ showcalendar: false });
  };

  showon = () => {
    this.setState({ showcalendar: true });
  };

  render() {
    return (
      <div>
        <form className="simple_form search" action="/">
          <div className="search-form-control form-group">
            <div className="inputdate">
              <input
                className="inputdatefrom"
                type="text"
                onClick={this.showon}
                value={this.state.showdate ? this.state.date[0].DatetoString() : 'enter dates'}
              />
            </div>
          </div>
        </form>
        <div>
          {this.state.showcalendar &&
            <div className="calendar">
              <Calendar
                locale={"en"}
                minDate={new Date()}
                onClickOutside={this.handleClickOutside}
                onChange={this.onChange}
                returnValue={"range"}
                selectRange={true}
              />
              <button className="btn btn-date" onClick={this.showoff}>Ok</button>
            </div>}
        </div>

      </div>
    );
  }
}

export default onClickOutside(DatesPicker);
