import React from 'react';


const EditorItemTime = ({className, label, children}) => {
	return (
		<div className={"editor__item-time editor__item_touch_no-label " + className}>
			<label className="editor__label">{label}</label>
			{children}
		</div>
	);
};


export default EditorItemTime;