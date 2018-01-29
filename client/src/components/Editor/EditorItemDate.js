import React from 'react';

const EditorItemDate = ({className, label, children}) => {
	return (
		<div className={"editor__item-date " + className}>
			<label className="editor__label">{label}</label>
			{children}
		</div>
	);
};


export default EditorItemDate;