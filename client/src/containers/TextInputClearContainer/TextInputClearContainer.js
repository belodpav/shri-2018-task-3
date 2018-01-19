import React, { Component } from 'react';
import IconContainer from '../IconContainer/IconContainer';

class TextInputClearContainer extends Component {
  render() {
    let className='text-input__clear'
    const { text, onClick } = this.props;

    className += (text && text.length) ? ' text-input__clear_visible_true' : '';

    return (
      <IconContainer cls={className} type="close" onClick={onClick} />
    );
  }
}

export default TextInputClearContainer;