import React from 'react';
import '../components/_FormSearch.scss';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';


export default class FormSearch extends React.Component {

  state = { cities: ["", ""] }

  addCity = () => {
    this.setState({ cities: [...this.state.cities, ""]});
  };

  handleChange(city, index) {
    this.state.cities[index] = city.target.value;
    this.setState({ cities: this.state.cities });
  };

  handleRemove = (index) => {
    this.state.cities.splice(index, 1);
    this.setState({ cities: this.state.cities });
  };

  handleReset = () => {
    this.setState({ cities: ["", ""] });
  };



  render() {

    return (
      <div>
        {
          this.state.cities.map((city, index) => {
            return (
              <div key={index}>
                <input
                  value={city}
                  onChange={(city) => this.handleChange(city, index)}
                />
                <button onClick={this.handleRemove}>-</button>
              </div>
            )
          })
        }

        <hr />

        <button onClick={this.addCity}>+</button>
        <button onClick={this.handleReset}>Reset</button>


      </div>
    )
  }

}
