import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as settingsActions from '../../actions/settingsActions';
import { Layout, Menu, Icon, Switch } from 'antd';
import logo from '../../images/flowist.png';
import './Sidebar.css';

const { Sider } = Layout;

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: 80
		};
	}

	componentWillMount() {
		this.props.settingsActions.fetchSettings();
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
			>
				<div id="app-sidebar-logo-div" className={this.props.settings.theme}>
					<Link to="/">
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
						id="sider-theme-switch"
						checkedChildren={<Icon type="rocket" />}
						unCheckedChildren={<Icon type="bulb" />}
						checked={this.props.settings.theme === 'dark'}
						onChange={this.updateTheme}
					/>
				</Menu>
			</Sider>
		);
	}
}

Sidebar.propTypes = {
	settingsActions: PropTypes.object,
	settings: PropTypes.object
};

function mapStateToProps(state) {
	return {
		settings: state.settings
	};
}

function mapDispatchToProps(dispatch) {
	return {
		settingsActions: bindActionCreators(settingsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
