import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Avatar, Layout, Menu, Dropdown, Icon, Button } from 'antd';
import logo from '../../images/flowist.png';
import './HeaderNav.css';

const { Header } = Layout;

const userMenu = (
  <Menu>
    <Menu.Item key="0">
        <Link to="/">
            <Icon type='user'/> Profile
        </Link>
    </Menu.Item>
    <Menu.Item key="1">
        <Link to="/">
            <Icon type='setting'/> User Settings
        </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
        <Link to="/user">
            <Icon type='logout'/> Log out
        </Link>
    </Menu.Item>
  </Menu>
);

export class HeaderNav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: 'light'
		};
	}

	render() {
		return (
		    <Header style={{ background: '#fff', paddingLeft: '16px' }}>
                <Icon
                className="header-trigger"
                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.props.toggle}
                />
                <div className='header-right'>
                    <Dropdown overlay={userMenu} placement="bottomRight">
                        <Avatar icon="user" />
                    </Dropdown>
                </div>
            </Header>
		);
	}
}

export default withRouter(HeaderNav);