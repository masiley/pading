import React from 'react';
import '../components/_LocationSearchInput.scss';
import PlacesAutocomplete from 'react-places-autocomplete';
import onClickOutside from 'react-onclickoutside';

class LocationSearchInput extends React.Component {
  state = {
    autoCompleteClass: ''
  };

  handleClickOutside = () => {
    this.setState({ autoCompleteClass: '' });
  }

  cityAutocompleteActive = () => {
    this.setState({ autoCompleteClass: 'city-autocomplete' });
  }

  render() {
    return (
      <div className="hello">

        <PlacesAutocomplete
          value={this.props.address}
          onChange={this.props.handleAddressChange}
          onSelect={this.props.addCity}
          searchOptions={{ types: ['(cities)'] }}
          highlightFirstSuggestion={true}
          onClickOutside={this.handleClickOutside}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className={this.state.autoCompleteClass}>
              <form noValidate autoComplete="off">






                <label className="inp">
                  <input className="city-departure-input" type="text" id="inp" placeholder="&nbsp;" onClick={this.cityAutocompleteActive}{...getInputProps({ className: 'city-departure-input'})}/>
                  <span className="label">We travel from</span>
                  <span className="focus-bg"></span>
                  <div>
                    {loading ? <div>...Loading</div> : null}
                  </div>
                  {suggestions.map((suggestion) => {
                    const style = {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      backgroundColor: suggestion.active ? '#f7f7f7' : '#fff', cursor: 'pointer',
                      color: '#262626',
                      fontFamily: 'Arimo',
                      fontWeight: suggestion.active ? '700' : '400',
                      textAlign: 'left',
                      paddingLeft: '15px',
                      height: '25px'
                    }
                    return (
                      <div className="suggestions-form" {...getSuggestionItemProps(suggestion, { style })}>
                      {
                        suggestion.active ? <i className="fas fa-map-marker-alt"></i> : null
                      }
                        {suggestion.description}
                      </div>
                    )
                  })}
                </label>
              </form>
            </div>
          )}

        </PlacesAutocomplete>
      </div>

    )
  }
}

export default onClickOutside(LocationSearchInput);


