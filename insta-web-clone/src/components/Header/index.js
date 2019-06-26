import React from 'react';
import styled from 'styled-components';
import sprite from '../../img/sprite.png';
import searchImg from '../../img/ic_search_48px-128.png';

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

const SearchBox = styled.div`
	width: 200px;
	padding-left: 80px;
	box-sizing: border-box;

	background: url(${searchImg});
	background-size: 16px;
	background-repeat: no-repeat;
	background-position: 62px 0;
`;

class Header extends React.Component {
	render() {
		return (
			<Nav>
				<NavMenus>
					<div className="nav-brand">
						<InstaBrandLogo href="/">Instagram</InstaBrandLogo>
					</div>
					<SearchBox type="text" placeholder="Search" />
				</NavMenus>
			</Nav>
		);
	}
}

export default Header;