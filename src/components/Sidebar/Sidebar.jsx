import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Switch } from 'antd';
import logo from '../../images/flowist.png';
import './Sidebar.css';

const { Sider } = Layout;

export class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
            width: 80,
			theme: 'light'
		};
	}

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
                trigger={null}
                breakpoint='md'
                collapsedWidth={this.state.width}
				collapsible
                onCollapse={this.props.toggle}
				collapsed={this.props.collapsed}
                onBreakpoint={this.onBreakpoint}
			>
				<div id="app-sidebar-logo-div" className={this.state.theme}>
					<Link to="/">
						<img src={logo} id="app-sidebar-logo" alt="Flowist Logo" />
                        <h1 id="app-sidebar-logo-title" className={this.state.theme}> flowist</h1>
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
                    <Switch
                id='sider-theme-switch'
                checkedChildren={<Icon type="rocket" />} unCheckedChildren={<Icon type="bulb" />}
                checked={this.state.theme === 'dark'}
                onChange={this.changeTheme}
            />
				</Menu>
			</Sider>
		);
	}
}

export default withRouter(Sidebar);