import React from 'react';
import LocationSearchInput from './LocationSearchInput';
import '../components/_FormSearch.scss';
import { Input, Label, FormGroup } from 'reactstrap';

export default class FormSearch extends React.Component {


  render() {
    console.log(this.props)
    return (
      <div className="travel-form">

          <p>Where do you travel from?</p>
          
          
          
          <button name="button" type="submit" className="btn btn-flat" onClick={this.props.onClick}>
              <i className="fas fa-search"></i> Search
          </button>
          <FormGroup check className="travel-checkbox">
           
            <Label check>
              <Input type="checkbox"/>{' '}
              Plane
            </Label>
            <Label check>
              <Input type="checkbox" />{' '}
              Train
            </Label>
            <Label check>
              <Input type="checkbox" />{' '}
              Bus
            </Label>
          </FormGroup>
          <LocationSearchInput/>

          ---Number of results {this.props.search.numberOfResults}---
      </div>
    );

  };
};
