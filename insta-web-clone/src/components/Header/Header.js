import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./Header.css";

class Header extends React.Component {
	render() {
		return (
			<FontAwesomeIcon icon={faInstagram} />
		);
	}
}

export default Header;