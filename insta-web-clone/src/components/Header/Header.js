import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled, { css } from 'styled-components';

const awesomeCard = css`
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0, 1px 3px rgba(0, 0, 0, 0.08);
	background-color: white;
	border-radius: 10px;
	padding: 20px;
`;

const Input = styled.input.attrs({
	required: false
})`
	border: none;
	${awesomeCard};
`;

const HeaderDiv = styled.div`
	height: 10vh;
	width: 100%;
	align: center;
	${awesomeCard};
`;

const VerticalLine = styled.div`
	border-left: 2px solid black;
	height: 30px;
`;

class Header extends React.Component {
	render() {
		return (
			<HeaderDiv>
				<FontAwesomeIcon icon={faInstagram} size="2x" /> 
				<VerticalLine />
				<Input placeholder="검색창" />
			</HeaderDiv>
		);
	}
}

export default Header;