import React, { Component } from 'react';

import TextInput from '../../components/TextInput/TextInput';

class TextInputContainer extends Component {
  constructor(props) {
    super(props);

    let initState = {
      focused: false,
      hovered: false,
      pressed: false
    };

    this.state = initState;
  }

  handleMouseEnter = () => {
    this.setState({
      hovered: true
    })
  };

  handleMouseLeave = () => {
    this.setState({
      hovered: false
    })
  };

  handleFocus = () => {
    this.setState({
      focused: true
    })
  };

  handleBlur = () => {
    const { onBlur } = this.props;
    this.setState({
      focused: false
    });
    if (onBlur) {
      onBlur();
    }
  };


  render() {
    let className = 'text-input text-input_theme_normal';
    const { hovered, focused, pressed } = this.state;
    const { placeholder, text, hasClear, onChange, onClear, cls, inputProps } = this.props;
    const { handleMouseEnter, handleMouseLeave, handleFocus, handleBlur } = this;

    className += ' ' + cls;
    className += hovered ? ' text-input_hovered_true' : '';
    className += focused ? ' text-input_focused_true' : '';
    className += pressed ? ' text-input_pressed_true' : '';

    className += hasClear ? ' text-input_has-icon_true text-input_has-clear_true' : '';

    return (
      <TextInput 
        text={text}
        placeholder={placeholder}
        className={className}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={onChange}
        onClear={onClear}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        inputProps={inputProps}
      />
    );
  }
}


export default TextInputContainer;