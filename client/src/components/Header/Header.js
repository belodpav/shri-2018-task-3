import React, { Component } from 'react';
import './Header.css';

const Header = ({ children }) => (
	<header className="app__header header">
		{children}
	</header>
);

export default Header;