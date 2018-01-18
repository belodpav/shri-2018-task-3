import React, { Component } from 'react';
import './TextInput.css';
import TextInputClearContainer from '../../containers/TextInputClearContainer/TextInputClearContainer';

const TextInput = (props) => {

const { 
  className,
  text,
  placeholder,
  onChange,
  onClear,
  onMouseEnter,
  onMouseLeave,
  onBlur,
  onFocus
  } = props;

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
      />
      <TextInputClearContainer onClick={onClear} text={text} />
    </div>
  );
}

export default TextInput;