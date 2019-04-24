import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, message, Avatar, Dropdown } from 'antd';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import ThemeSwitch from '../../ThemeSwitch';
import '../HeaderNav.scss';

export class UserMenu extends Component {
	updateTheme = () => {
		this.props.settingsActions.updateSettings(
			Object.assign({}, this.props.settings, { theme: this.props.settings.theme === 'light' ? 'dark' : 'light' })
		);
	};

	handleLogout = async () => {
		try {
			await Auth.signOut();

			this.props.userActions.updateUser({ ...this.props.user, isAuthenticated: false });
			message.success('Logged out successfully!');
		} catch (e) {
			message.error('Uhoh :( Failed to log out successfully...');
		}
	};

	render() {
		const username = this.props.user.user.attributes.name + ' ' + this.props.user.user.attributes.family_name;

		const menuItems = (
			<Menu>
				<Menu.Item key="0">
					<span style={{ fontWeight: 600 }}>{username}</span>
					<br />
					<span style={{ fontWeight: 300, fontSize: 12, color: '#777' }}>
						{this.props.user.user.attributes.email}
					</span>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="0">
					<Link to="/app/profile">
						<i className="fas fa-user" style={{marginRight: 'unset'}}/> Profile
					</Link>
				</Menu.Item>
				<Menu.Item key="1">
					<Link to="/app/settings">
						<Icon type="setting" theme="filled"/> User Settings
					</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<ThemeSwitch updateTheme={this.updateTheme} theme={this.props.settings.theme} />
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="3">
					<Link to="/user" onClick={this.handleLogout}>
						<Icon type="logout" /> Log out
					</Link>
				</Menu.Item>
			</Menu>
		);
		return (
			<Dropdown id="profile-dropdown" trigger={[ 'click' ]} overlay={menuItems} placement="bottomRight">
				<span
					className="ant-dropdown-link"
					style={{
						display: 'inline-block',
						height: '40px',
						padding: '5px',
						textRendering: 'optimizelegibility'
					}}
				>
					<Avatar icon="user" size={30} />
					<span
						style={{ padding: '0 5px', fontWeight: '600'}}
						id="username"
					>
						{username}
					</span>
				</span>
			</Dropdown>
		);
	}
}

export default UserMenu;
