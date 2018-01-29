import React from 'react';

const EditorBody = ({children}) => (
	<div className="editor__body">
		<div className="editor__grid">
			{children}
		</div>
	</div>
);

export default EditorBody;