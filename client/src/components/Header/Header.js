import React from 'react';
import './Header.css';

const Header = ({ children }) => (
	<header className="home__header header">
		{children}
	</header>
);

export default Header;