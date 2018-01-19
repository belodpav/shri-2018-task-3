import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircleButton from '../../components/CircleButton/CircleButton';

class CircleButtonContainer extends Component {
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
    let className = 'circle-button circle-button_theme_normal';
    const { hovered, focused, pressed } = this.state;
    const {
      onClick,
      cls,
      disabled,
      children,
      touchHidden,
      size,
      hasIcon,
      iconType } = this.props;

    const {
      handleOnMouseEnter,
      handleOnMouseLeave,
      handleOnMouseDown,
      handleOnMouseUp,
      handleOnFocus, 
      handleOnBlur } = this;

    className += ' ' + cls;
    className += hovered ? ' circle-button_hovered_true' : '';
    className += focused ? ' circle-button_focused_true' : '';
    className += pressed ? ' circle-button_pressed_true' : '';

    className += ' circle-button_size_' + size;
    className += touchHidden ? ' circle-button_touch_hide' : '';

    return (
      <CircleButton
        className={className}
        disabled={disabled}
        hasIcon={hasIcon}
        iconType={iconType}
        onClick={onClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    );

  }
}

CircleButtonContainer.propTypes = {
  cls: PropTypes.string,
  disabled: PropTypes.bool,
  touchHidden: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'lg']),
  onClick: PropTypes.func,
  hasIcon: PropTypes.bool,
  iconType: PropTypes.string
};

CircleButtonContainer.defaultProps = {
  size: 'md',
  iconType: ''
};

export default CircleButtonContainer;