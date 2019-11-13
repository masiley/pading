import React from 'react';
import {LinkedCalendar} from 'rb-datepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import './_BootstrapDatesPicker.scss';

export default class BootstrapDatesPicker extends React.Component {

    state = {
      startDate: new Date(),
      endDate: ''
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate });
        console.log(this.state.startDate);
    };

    render() {
        return (
            <LinkedCalendar
              onDatesChange={this.onDatesChange}
              showDropdowns={false}
            />
        );
    }
}
