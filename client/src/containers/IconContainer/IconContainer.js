import React, { Component } from 'react';

import { Icon } from '../../components/Icon/Icon';

class IconContainer extends Component {
  constructor(props) {
    super(props)

    let initState = {
      hovered: false
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

  render() {
    let className = 'icon';

    const { hovered, focused, pressed } = this.state;
    const { type, onClick, cls } = this.props;
    const { handleMouseEnter, handleMouseLeave } = this;
    
    className += (' ' + cls);
    className += hovered ? ' icon_hovered_true' : '';
    className += focused ? ' icon_focused_true' : '';
    className += pressed ? ' icon_pressed_true' : '';

    className += ' icon_type_' + type;

    return (
      <Icon 
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      />
    );


  }
}

export default IconContainer;