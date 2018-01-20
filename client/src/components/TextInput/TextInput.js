import React, { Component } from 'react';
import './TextInput.css';
import TextInputClearContainer from '../../containers/TextInputClearContainer/TextInputClearContainer';

const TextInput = (props) => {

const { 
  className,
  text,
  placeholder,
  inputProps,
  onChange,
  onClear,
  onMouseEnter,
  onMouseLeave,
  onBlur,
  onFocus
  } = props;

  let val = '';
  if (inputProps) {
    val = inputProps.value;
  } else {
    val = text;
  }

  return (
    <div 
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur} 
    >
      <input
        type="text"
        value={text}
        className="text-input__control"
        placeholder={placeholder}
        onChange={onChange}
        {...inputProps}
      />
      <TextInputClearContainer onClick={onClear} text={val} />
    </div>
  );
}

export default TextInput;