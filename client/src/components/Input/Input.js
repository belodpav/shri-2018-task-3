import React, { Component } from 'react';

import './Input.css';


import { IconClose } from '../Icon/Icon';




function Input({type, placeholder, iconType}) {
	return (
		<div>
		</div>
	);
}

const InputControl = ({type, placeholder}) => (
	<input 
		type={type}
		className="input__control"
		placeholder={placeholder}
	/>
);




export { Input };

