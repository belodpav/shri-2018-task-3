import React, { Component } from 'react';

const EditorPersonsBox = ({children}) => {
	return (
		<div className="editor__persons-box editor__item_touch_space-line">
			{children}
		</div>
	);
};


export default EditorPersonsBox;