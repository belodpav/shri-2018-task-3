import React, { Component } from 'react';


class EditorValidator extends Component {

  render() {
    const { message } = this.props;
    return (
      <div className="new-meeting__message">{message}</div>
    );
  }
}

export default EditorValidator;