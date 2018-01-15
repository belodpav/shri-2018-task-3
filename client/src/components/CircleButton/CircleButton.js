import React, { Component } from 'react';

import './CircleButton.css';

import {IconArrowLeft, IconArrowRight, IconClose, IconEdit} from '../Icon/Icon';

const CircleButton = ({onClick, children, className}) => {
	return (
		<button
			onClick={onClick}
			className={'circle-button circle-button_size_md circle-button_theme_normal ' + (className ? className : '') }
		>
			{children}
		</button>
	);
};

const CircleButtonLg = ({onClick, children}) => {
	return (
		<button
			onClick={onClick}
			className='circle-button circle-button_size_lg circle-button_theme_normal' 
		>
			{children}
		</button>
	);
};

const CircleButtonLeft = ({onClick}) => {
	return (
		<CircleButtonLg onClick={onClick} >
			<IconArrowLeft className="circle-button__icon" />
		</CircleButtonLg>
	);
};
const CircleButtonRight = ({onClick}) => {
	return (
		<CircleButtonLg onClick={onClick}>
			<IconArrowRight className="circle-button__icon" />
		</CircleButtonLg>
	);
};

const CircleButtonClose = ({className, onClick}) => {
	return (
		<CircleButton onClick={onClick} className={ className } >
			<IconClose className="circle-button__icon" />
		</CircleButton>
	);
};

const CircleButtonEdit = ({className, onClick}) => {
	return (
		<CircleButton onClick={onClick} className={ className } >
			<IconEdit className="circle-button__icon" />
		</CircleButton>
	);
};



export {CircleButton, CircleButtonLeft, CircleButtonRight, CircleButtonClose, CircleButtonEdit};
