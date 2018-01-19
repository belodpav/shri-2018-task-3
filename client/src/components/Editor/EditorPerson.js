import React, { Component } from 'react';

import { Person } from '../Person/Person';
import IconContainer from '../../containers/IconContainer/IconContainer';

const EditorPerson = ({onClick, person}) => {
	
	function handleClick() {
		onClick(person);
	}

	return (
		<div className="editor__person">
			<Person name={person.login} avatarUrl={person.avatarUrl}/>
			<IconContainer
				cls="editor__person-clear"
				type="close"
				onClick={handleClick}
			/>
		</div>
	);
}

export default EditorPerson;