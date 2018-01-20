import React, { Component } from 'react';
import './FreeTimeRange.css';

const FreeTimeRange = (props) => {
  const {
    width,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur
  } = props;

	return (
		<div 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{width: width}}
    >
			<div className="free-time-range__add">
				<span className="free-time-range__plus-icon icon icon_type_plus"></span>
			</div>
		</div>
	);
}


export default FreeTimeRange;
