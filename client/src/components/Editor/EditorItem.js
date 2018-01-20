import React, { Component } from 'react';

const EditorItem = ({className, label, children}) => {

	return (
		<div className={"editor__item " + className}>
			<label className="editor__label">{label}</label>
			{children}
		</div>
	);
};

export default EditorItem;