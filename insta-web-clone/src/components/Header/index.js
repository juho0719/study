import React from 'react';
import styled from 'styled-components';
import sprite from '../../img/sprite.png';

const Nav = styled.nav`
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 2;
	-webkit-transition: height 0.2s ease-in-out;
	transition: height 0.2s ease-in-out;
	height: 77px;
`;

const NavMenus = styled.div`
	display: flex;
	flex-direction: row;
	height: 77px;
	width: 70%;
	margin: 0 auto;
	padding: 26px 40px;
`;

const InstaBrandLogo = styled.a`
	display: block;
	background-position: -176px 0px;
	background-image: url(${sprite});
	background-size: 405px 379px;
	background-repeat: no-repeat;
	height: 35px;
	width: 176px;
	text-indent: -1000%
`;

class Header extends React.Component {
	render() {
		return (
			<Nav>
				<NavMenus>
					<div className="nav-brand">
						<InstaBrandLogo href="/">Instagram</InstaBrandLogo>
					</div>
				</NavMenus>
			</Nav>
		);
	}
}

export default Header;