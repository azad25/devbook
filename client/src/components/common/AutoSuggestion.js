import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import cities from "cities.json";

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  const regex = new RegExp("^" + escapedValue, "i");
  const suggestions = cities.filter(city => regex.test(city.name));

  return suggestions;
};

class AutoSuggestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      value: "",
      suggestions: [],
      disabled: false,
      color: "#495057",
      info: this.props.info
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
      color: "#007bff"
    });
  };

  getSuggestionValue = suggestion => {
    this.setState({
      disabled: true,
      color: "#007bff"
    });
    return suggestion.name + "," + suggestion.country;
  };

  renderSuggestion = suggestion => {
    return suggestion.name + "," + suggestion.country;
  };

  shouldRenderSuggestions =(value) => {
    return value.trim().length > 2;
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      color: "#007bff"
    });
  };

  onClick = e => {
    e.preventDefault();
    this.setState({
      value: "",
      disabled: false,
      color: "#495057"
    });
  };
  render() {
    const { value, suggestions, info } = this.state;
    const inputProps = {
      name: this.state.name,
      placeholder: "Add Location",
      value,
      className: "form-control form-control-lg",
      onChange: this.onChange,
      disabled: this.state.disabled
    };

    return (
      <div className="form-group">
        <div className="input-group mb-3">
          <div className="input-group-prepend" onClick={this.onClick}>
            <span className="input-group-text">
              <i
                className="fas fa-map-marker-alt"
                style={{ color: this.state.color }}
              />
            </span>
          </div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            shouldRenderSuggestions={this.shouldRenderSuggestions}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            inputProps={inputProps}
            highlightFirstSuggestion={true}
          />
        </div>
        {info && <small className="form-text text-muted"><i className="fas fa-lightbulb text-primary" style={{color:'#f1c40f'}}></i> {info}</small>}
      </div>
    );
  }
}

export default AutoSuggestion;
