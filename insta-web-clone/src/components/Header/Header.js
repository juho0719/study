import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

class Header extends React.Component {
	render() {
		return (
			<HeaderDiv>
				<FontAwesomeIcon icon={faInstagram} size="2x" />
			</HeaderDiv>
		);
	}
}

const HeaderDiv = styled.div`
	height: 10vh;
	width: 100%;
	background-color: pink;
	align: center;
`;

export default Header;