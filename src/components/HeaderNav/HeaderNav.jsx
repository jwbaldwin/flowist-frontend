import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Layout, Menu, Dropdown, Icon } from 'antd';
import logo from '../../images/flowist.png';
import './HeaderNav.css';

const { Header } = Layout;

const userMenu = (
	<Menu>
		<Menu.Item key="0">
			<Link to="/">
				<Icon type="user" /> Profile
			</Link>
		</Menu.Item>
		<Menu.Item key="1">
			<Link to="/">
				<Icon type="setting" /> User Settings
			</Link>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="2">
			<Link to="/user">
				<Icon type="logout" /> Log out
			</Link>
		</Menu.Item>
	</Menu>
);

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
					<Dropdown trigger={[ 'hover', 'click' ]} overlay={userMenu} placement="bottomRight">
						<Avatar icon="user" />
					</Dropdown>
				</div>
			</Header>
		);
	}
}

export default HeaderNav;
