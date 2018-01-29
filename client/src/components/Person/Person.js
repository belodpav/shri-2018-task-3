import React from 'react';

import './Person.css';


const Person = ({name, avatarUrl, homeFloor}) => (
	<div className="person">
		<div className="person__avatar">
			<img className="person__avatar-img" src={avatarUrl} alt={name} />
		</div>
		<div className="person__name">
			{name}
		</div>
	</div>
);

const PersonSmall = ({name, avatarUrl, homeFloor}) => (
  <div className="person person_size_small">
    <div className="person__avatar">
      <img className="person__avatar-img" src={avatarUrl} alt={name} />
    </div>
    <div className="person__name">
      {name}
    </div>
  </div>
);

export { Person, PersonSmall };