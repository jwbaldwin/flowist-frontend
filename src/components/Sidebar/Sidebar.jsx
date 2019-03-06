import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
import logo from '../../images/flowist.png';
import './Sidebar.css';

const { Sider } = Layout;

export class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: false,
            width: 80,
			theme: 'light'
		};
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	};

    onBreakpoint = (broken) => {
        if(broken) {
            this.setState({ width: 0 });
        } else {
            this.setState({ width: 80 });
        }

	};

	changeTheme = (value) => {
		this.setState({
			theme: value ? 'dark' : 'light'
		});
	};

	render() {
		return (
			<Sider
				className="sider"
				theme={this.state.theme}
                breakpoint='md'
                collapsedWidth={this.state.width}
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
                onBreakpoint={this.onBreakpoint}
			>
				<div id="app-sidebar-logo-div">
					<Link to="/">
						<img src={logo} id="app-sidebar-logo" alt="Flowist Logo" />
					</Link>
				</div>
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
					<Link to="/user">
						<Button size="large" type="primary" id='signin-login-btn'>
							login
						</Button>
					</Link>
				</Menu>
			</Sider>
		);
	}
}

export default withRouter(Sidebar);
