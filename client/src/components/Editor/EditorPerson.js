import React, { Component } from 'react';

import { Person } from '../Person/Person';
import { IconClose } from '../Icon/Icon';

const EditorPerson = ({onClick, person}) => {
	
	function handleClick() {
		onClick(person);
	}

	return (
		<div className="editor__person">
			<Person name={person.login} avatarUrl={person.avatarUrl}/>
			<IconClose onClick={handleClick} className="editor__person-clear" />
		</div>
	);
}

export default EditorPerson;