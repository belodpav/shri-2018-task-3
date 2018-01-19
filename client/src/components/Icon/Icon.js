import React, { Component } from 'react';

import './Icon.css';

const Icon = (props) => {
	const {
		className,
		onClick,
		onMouseEnter,
		onMouseLeave
	} = props;

	return (
		<span
			className={className}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave} 
		/>
	);
}

export default Icon;


