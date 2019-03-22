import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, message, Avatar, Dropdown } from 'antd';
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
        const username = this.props.user.user.attributes.name + " " + this.props.user.user.attributes.family_name;
        
        const menuItems =
            <Menu>
                <Menu.Item key="0">
                    <span style={{fontWeight: 600}}>{username}</span>
                    <br/>
                    <span style={{fontWeight: 300, fontSize: 12, color: '#777'}}>{this.props.user.user.attributes.email}</span>
                </Menu.Item>
                <Menu.Divider />
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
		return (
            <Dropdown id="profile-dropdown" trigger={['click' ]} overlay={menuItems} placement="bottomRight">
                <span className="ant-dropdown-link" style={{display: 'inline-block'}}>
                  <Avatar icon='user'/>   <Icon type="down" />
                </span>
			</Dropdown>
		);
	}
}

export default UserMenu;
