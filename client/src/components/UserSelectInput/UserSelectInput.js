import React from 'react';
import Autosuggest from 'react-autosuggest';
import './UserSelectInput.css';
import IconContainer from '../../containers/IconContainer/IconContainer';

const UserSelectInput = (props) => {
  const {
    suggestions,
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
        highlightFirstSuggestion={false}
        renderInputComponent={renderInputComponent}
      />
      <IconContainer cls={iconClassName} onClick={onHideSuggestions} type="arrow-down" />
      </div>

  );
};

export default UserSelectInput;