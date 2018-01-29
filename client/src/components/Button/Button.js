import React from 'react';

import './Button.css'; 

const Button = (props) => {
	const {
		children,
		className,
		disabled,
		onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur } = props;

	return (
		<button
			className={className}
			disabled={disabled}
			onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onFocus={onFocus}
      onBlur={onBlur}
		>
			{children}
		</button>
	);
}

export default Button;
