import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserSelectInput from '../../components/UserSelectInput/UserSelectInput';
import TextInputContainer from '../TextInputContainer/TextInputContainer';
import { PersonSmall } from '../../components/Person/Person';

class UserSelectInputContainer extends Component {
  constructor(props) {
    super(props)

    const suggestions = this.props.list;

    const initState = {
      value: '',
      suggestions: suggestions,
      opened: false
    };

    this.state = initState;
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.login;
  };

  renderSuggestion = (suggestion) => {
    return (
      <div className="input-autocomplete__item">
        <PersonSmall name={suggestion.login} avatarUrl={suggestion.avatarUrl} />
        <div className="input-autocomplete__floor">
         &nbsp;·&nbsp;{suggestion.homeFloor} этаж
        </div>
      </div>
    );
  };

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const sug =  inputLength === 0 ? this.props.list : this.props.list.filter(lang => {
      const name = lang.login.toLowerCase();
      if (name.indexOf(inputValue) >= 0) {
        return true
      } else {
        return false;
      }
    });
    if (!sug.length) {
      this.setState({
        opened: false
      });
    } else {
      this.setState({
        opened: true
      }); 
    }
    return sug;
  };

  getSuggestionValue = (suggestion) => {
    return suggestion.login;
  };

  handleOnChange = (value, { newValue}) => {

    this.setState({
      value: newValue,
      opened: true
    });
  };

  handleOnClear = () => {
    this.setState({
      value: ''
    });
  };
  
  handleOnHideSuggestions = () => {
    this.setState({
      opened: false
    });
  }

  handleOnSuggestionsFetchRequested = ({ value }) => {
    
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  handleOnSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleOnSuggestionSelected = (event, {suggestion}) => {
    this.props.onSelected(suggestion);
    this.setState({
      value: '',
      suggestions: this.props.list,
      opened: false
    });
  };
  
  handleOnBlur = () => {
    this.setState({
      opened: false
    });
  };
  renderInputComponent = (inputProps) => { 
    const { handleOnClear, handleOnBlur } = this;

    return (
      <TextInputContainer 
        onClear={handleOnClear}
        inputProps={inputProps}
        hasClear={true}
        onBlur={handleOnBlur}
        placeholder={''}
      />
    );
  }

  render() {
    let className='';
    const { value, suggestions, opened } = this.state;
    const {
      handleOnHideSuggestions,
      handleOnChange,
      handleOnSuggestionSelected,
      handleOnSuggestionsFetchRequested,
      handleOnSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
      handleOnClear,
      renderInputComponent
    } = this;
    const { list, placeholder } = this.props;
    const inputProps = {
      placeholder: placeholder,
      value,
      onChange: handleOnChange
    };
    
    return (
      <UserSelectInput
        opened={opened}
        onClear={handleOnClear}
        suggestions={suggestions}
        onHideSuggestions={handleOnHideSuggestions}
        onSuggestionsFetchRequested={handleOnSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleOnSuggestionsClearRequested}
        onSuggestionSelected={handleOnSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
      />
    );
  }
}

UserSelectInputContainer.propTypes = {
  placeholder: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object),
  onSelected: PropTypes.func
};

export default UserSelectInputContainer;

