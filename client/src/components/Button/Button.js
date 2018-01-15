import React, { Component } from 'react';

import './Button.css';

const Button = ({onClick, disabled, touchHidden, className, children, theme}) => {
	let classN = ' button button_size_md';
	classN += touchHidden ? ' button_touch_hide' : '';
	classN += theme === 'active' ? ' button_theme_active' : ' button_theme_normal';
	return (
		<button
			onClick={onClick}
			className={className  + classN}
			disabled={disabled} 
		>
			{children}
		</button>
	);
}

export default Button;
