import React, { Component } from 'react';

import './Icon.css';

const IconArrowRight = ({className}) => {
	return (
		<span className={ "icon icon_type_arrow-right " + (className ? className : '') }></span>
	);
};

const IconArrowLeft = ({className}) => {
	return (
		<span className={ "icon icon_type_arrow-left " + (className ? className : '') }></span>
	);
}

const IconClose = ({onClick, className}) => {
	return (
		<span onClick={onClick} className={ "icon icon_type_close " + (className ? className : '') }></span>
	);
}

const IconEdit = ({onClick, className}) => {
	return (
		<span onClick={onClick} className={ "icon icon_type_edit " + (className ? className : '') }></span>
	);
}

const IconCalendar = ({onClick, className}) => {
	return (
		<span onClick={onClick} className={ "icon icon_type_calendar " + (className ? className : '') }></span>
	);
}

const Icon = (props) => {
	const { className, onClick } = props;

	return (
		<span className={className} onClick={onClick} />
	);
};

export {IconArrowLeft, IconArrowRight, IconClose, IconCalendar, IconEdit, Icon};


