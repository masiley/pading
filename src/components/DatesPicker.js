import React from 'react';
import Calendar from 'react-calendar';
import './_DatesPicker.scss';
import onClickOutside from 'react-onclickoutside'



class DatesPicker extends React.Component {
  state = {
    datefrom: new Date(),
    dateto: '',
    firstClick: true,
    showdate: false,
    showcalendar: false,
  };

  handleClickOutside = () => {
  this.setState({showcalendar: false })
  console.log('onClickOutside() method called')

}


  onSelectDate = date => {
    if (this.state.firstClick) {
      this.setState({ datefrom: date });
      this.setState({ dateto: date });
    } else {
      this.setState({ dateto: date });
    }
    this.setState({ firstClick: !this.state.firstClick })
  }

  onInputChange = date => {
    this.setState({ showdate: true });
  };

  showoff = () => {
    this.setState({ showcalendar: false });
  };

  showon = () => {
    this.setState({ showcalendar: true });
  };

//implement mindate
//showof when clicking outside component

  render() {
    return (
      <div>
        <form className="simple_form search" action="/">
          <div className="search-form-control form-group">
            <div className="inputdate">
              <input
                className="inputdatefrom"
                type="text"
                onChange={this.onInputChange}
                onClick={this.showon}
                value={this.state.showdate ? this.state.datefrom.toLocaleDateString() : 'date from'}
              />
              <input
                className="inputdateto"
                type="text"
                onChange={this.onInputChange}
                onClick={this.showon}
                value={this.state.showdate ? this.state.dateto.toLocaleDateString() : 'date to'}
              />
            </div>
            <button name="button" type="submit" className="btn btn-flat">
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </form>
        <div>
          {this.state.showcalendar &&
            <div className="calendar">
              <Calendar
                locale={"en"}
                onClickOutside={this.handleClickOutside}
                onClickDay={this.onSelectDate}
                onChange={this.onInputChange}
                selectRange={true}
                value={this.state.datefrom}
              />
              <button className="btn btn-date" onClick={this.showoff}>Ok</button>
            </div>}
        </div>

      </div>
    );
  }
}

export default onClickOutside(DatesPicker);
