import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { PersonSmall } from '../Person/Person';
import './UserSelectInput.css';
import TextInputContainer from '../../containers/TextInputContainer/TextInputContainer';
import IconContainer from '../../containers/IconContainer/IconContainer';

const UserSelectInput = (props) => {
  const {
    value,
    suggestions,
    onChange,
    onClear,
    onHideSuggestions,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    onSuggestionSelected,
    getSuggestionValue,
    renderSuggestion,
    renderInputComponent,
    inputProps,
    opened
  } = props;
  let iconClassName = 'autocomplete__icon';
  iconClassName += opened ? ' autocomplete__icon_visible_true' : '';

  return (
    <div style={{position: 'relative'}}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        shouldRenderSuggestions={ () => true }
        focusInputOnSuggestionClick={false}
        highlightFirstSuggestion={true}
        renderInputComponent={renderInputComponent}
      />
      <IconContainer cls={iconClassName} onClick={onHideSuggestions} type="arrow-down" />
      </div>

  );
};

export default UserSelectInput;