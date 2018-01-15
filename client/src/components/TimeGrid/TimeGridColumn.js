import React, { Component } from 'react';

const TimeGridColumn = ({className, children}) => (
		<div 
			className={ "timegrid__column " + ( className  ? " " + className : "") }
		>
			{children}
		</div>
);

export default TimeGridColumn;