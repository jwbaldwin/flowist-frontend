import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './Sidebar.css';

const { Sider } = Layout;

export class Sidebar extends Component {
	state = {
		collapsed: false
	};

	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	};

	render() {
		return (
			<Sider theme="light" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
				<div id="app-sidebar-logo" />
				<Menu defaultSelectedKeys={[ '1' ]} mode="inline">
					<Menu.Item key="1">
						<Link to="/">
							<Icon type="coffee" />
							<span>#flows</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/tags">
							<Icon type="tags" />
							<span>#tags</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Icon type="inbox" />
						<span>#archive</span>
					</Menu.Item>
					<Menu.Item key="4">
						<Icon type="setting" />
						<span>#settings</span>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
}

export default withRouter(Sidebar);
