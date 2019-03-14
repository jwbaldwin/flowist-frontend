import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Layout, Icon } from 'antd';
import logo from '../../images/flowist.png';
import UserMenu from './UserMenu';
import './HeaderNav.css';

const { Header } = Layout;

export class HeaderNav extends Component {

	render() {
		return (
			<Header style={{ paddingLeft: '16px' }} className={this.props.settings.theme}>
				<div className="header-left">
					<div id="app-headernav-logo-div">
						<Link to="/">
							<img src={logo} id="app-headernav-logo" alt="Flowist Logo" />
						</Link>
					</div>
				</div>
				<Icon
					className="header-trigger"
					type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
					onClick={this.props.toggle}
				/>
				<div className="header-right">
					<UserMenu {...this.props}/>
				</div>
			</Header>
		);
	}
}

export default HeaderNav;
