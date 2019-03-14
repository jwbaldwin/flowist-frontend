import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, message } from 'antd';
import { Auth } from "aws-amplify";
import '../HeaderNav.css';

export class UserMenu extends Component {

    handleLogout = async () => {
        try {
            await Auth.signOut();

            this.props.userActions.updateUser({...this.props.user, isAuthenticated: false});
            message.success("Logged out successfully!");
        } catch (e) {
            message.error("Uhoh :( Failed to log out successfully...");
        }
    }

	render() {
		return (
            <Menu>
                <Menu.Item key="0">
                    <Link to="/profile">
                        <Icon type="user" /> Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to="/settings">
                        <Icon type="setting" /> User Settings
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">
                    <Link to="/user" onClick={this.handleLogout}>
                        <Icon type="logout" /> Log out
                    </Link>
                </Menu.Item>
            </Menu>
		);
	}
}

export default UserMenu;
