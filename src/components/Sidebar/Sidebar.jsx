import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Switch } from 'antd';
import './Sidebar.css';

const { Sider } = Layout;

export class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: false,
			theme: 'light'
		};
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	};

	changeTheme = (value) => {
		this.setState({
			theme: value ? 'dark' : 'light'
		});
	};

	render() {
		return (
			<Sider className="sider" theme={this.state.theme} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
				<div id="app-sidebar-logo" />
				<Menu theme={this.state.theme} defaultSelectedKeys={[ this.props.location.pathname ]} mode="inline">
					<Menu.Item key="/">
						<Link to="/">
							<Icon type="coffee" />
							<span>#flows</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="/tags">
						<Link to="/tags">
							<Icon type="tags" />
							<span>#tags</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="/archive">
						<Link to="/archive">
							<Icon type="inbox" />
							<span>#archive</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="/settings">
						<Link to="/settings">
							<Icon type="setting" />
							<span>#settings</span>
						</Link>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
}

export default withRouter(Sidebar);
