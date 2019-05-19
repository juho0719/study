import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import "./Header.css";

class Header extends React.Component {
	render() {
		return (
			<FontAwesomeIcon icon={['fab', 'apple']} />
		);
	}
}

export default Header;