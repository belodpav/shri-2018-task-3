import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';

import './InputAutocomplete.css';

import { PersonSmall } from '../Person/Person';


 
const getSuggestionValue = suggestion => suggestion.login;

const renderSuggestion = suggestion => (
  <div className="input-autocomplete__item">
  	<PersonSmall name={suggestion.login} avatarUrl={suggestion.avatarUrl} />
  	<div className="input-autocomplete__floor">
		 &nbsp;·&nbsp;{suggestion.homeFloor} этаж
		</div>
  </div>
);


class InputAutocomplete extends Component {
	

	constructor(props) {
		super(props);
		this.state = {
		  value: '',
		  suggestions: this.props.list
		};
	}

	getSuggestions = value => {
	  const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;
	  return inputLength === 0 ? this.props.list : this.props.list.filter(lang => {
	    const name = lang.login.toLowerCase();
	    if (name.indexOf(inputValue) >= 0) {
	    	return true
	    } else {
	    	return false;
	    }
	  });
	};

	getSuggestionValue = suggestion => suggestion.login;
	onChange = (event, { newValue }) => {
		this.setState({
		  value: newValue
		});
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		
		this.setState({
		  suggestions: this.getSuggestions(value)
		});
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
		  suggestions: []
		});
	};

	onSuggestionSelected = (event, {suggestion}) => {
		this.props.onSelected(suggestion);
		this.setState({
			value: '',
		  	suggestions: this.props.list
		});
	}

	render() {
		const { value, suggestions } = this.state;
	    const inputProps = {
	      placeholder: this.props.placeholder,
	      value,
	      onChange: this.onChange
	    };

		return (
			<div className="input input_size_md input_theme_normal input_actions_true">
				<Autosuggest
			        suggestions={suggestions}
			        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
			        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			        onSuggestionSelected={this.onSuggestionSelected}
			        getSuggestionValue={this.getSuggestionValue}
			        renderSuggestion={renderSuggestion}
			        inputProps={inputProps}
							shouldRenderSuggestions={ () => true }
							focusInputOnSuggestionClick={false}
							highlightFirstSuggestion={true} 
			      />
			</div>
		);
	}
}

export default InputAutocomplete;