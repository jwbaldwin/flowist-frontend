import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import logo from '../../assets/images/flowist.png';
import ThemeSwitch from './ThemeSwitch';
import './Sidebar.scss';

const { Sider } = Layout;

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: 80
		};
	}

	onBreakpoint = (broken) => {
		if (broken) {
			this.setState({ width: 0 });
		} else {
			this.setState({ width: 80 });
		}
	};

	updateTheme = () => {
		this.props.settingsActions.updateSettings(
			Object.assign({}, this.props.settings, { theme: this.props.settings.theme === 'light' ? 'dark' : 'light' })
		);
	};

	render() {
		return (
			<Sider
				className={"sider-shadow-" + this.props.settings.theme}
				theme={this.props.settings.theme}
				trigger={null}
				breakpoint="md"
				collapsedWidth={this.state.width}
				collapsible
				onCollapse={this.props.toggle}
				collapsed={this.props.collapsed}
				onBreakpoint={this.onBreakpoint}
                width={256}
			>
				<div id="app-sidebar-logo-div" className={this.props.settings.theme}>
					<Link to="/app">
						<img src={logo} id="app-sidebar-logo" alt="Flowist Logo" />
						<h1 id="app-sidebar-logo-title" className={this.props.settings.theme}>
							{' '}
							flowist
						</h1>
					</Link>
				</div>
				<Menu
					theme={this.props.settings.theme}
					defaultSelectedKeys={[ this.props.location.pathname ]}
					mode="inline"
				>
					<Menu.Item key="/app">
						<Link to="/app">
							<Icon type="coffee" />
							<span>#flows</span>
						</Link>
					</Menu.Item>
                    <Menu.Item key="/app/archive">
						<Link to="/app/archive">
							<Icon type="inbox" />
							<span>#archive</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="/app/tags" disabled>
						<Link to="/app/tags">
							<Icon type="tags" />
							<span>#tags (beta)</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="/app/settings" disabled>
						<Link to="/app/settings">
							<Icon type="share-alt" />
							<span>#insights (beta)</span>
						</Link>
					</Menu.Item>
                    <Menu.ItemGroup>
                       <ThemeSwitch updateTheme={this.updateTheme} theme={this.props.settings.theme}/>
                    </Menu.ItemGroup>
				</Menu>
			</Sider>
		);
	}
}

export default withRouter(Sidebar);
