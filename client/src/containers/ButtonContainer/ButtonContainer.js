import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';

class ButtonContainer extends Component {
  constructor(props) {
    super(props);

    const initState = {
      focused: false,
      pressed: false,
      hovered: false
    };

    this.state = initState;
  }

  handleOnMouseEnter = () => {
    this.setState({
      hovered: true
    })
  };

  handleOnMouseLeave = () => {
    this.setState({
      hovered: false,
      pressed: false
    })
  };

  handleOnFocus = () => {
    this.setState({
      focused: true
    })
  };

  handleOnBlur = () => {

    this.setState({
      focused: false
    });
  };

  handleOnMouseDown = () => {

    this.setState({
      pressed: true
    });
  };

  handleOnMouseUp = () => {

    this.setState({
      pressed: false
    });
  };

  render() {
    let className = 'button button_size_md';
    const { hovered, focused, pressed } = this.state;
    const { theme, onClick, cls, disabled, children, touchHidden } = this.props;
    const {
      handleOnMouseEnter,
      handleOnMouseLeave,
      handleOnMouseDown,
      handleOnMouseUp,
      handleOnFocus, 
      handleOnBlur } = this;

    className += ' ' + cls;
    className += hovered ? ' button_hovered_true' : '';
    className += focused ? ' button_focused_true' : '';
    className += pressed ? ' button_pressed_true' : '';

    className += theme ? ' button_theme_' + theme : ' button_theme_normal';
    className += touchHidden ? ' button_touch_hide' : '';

    return (
      <Button
        className={className}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      >
        {children}
      </Button>

    );

  }
}

ButtonContainer.propTypes = {
  cls: PropTypes.string,
  theme: PropTypes.oneOf(['normal', 'active']),
  touchHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default ButtonContainer;