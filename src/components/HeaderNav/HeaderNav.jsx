import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as settingsActions from '../../actions/settingsActions';
import { Avatar, Layout, Menu, Dropdown, Icon } from 'antd';
import logo from '../../images/flowist.png';
import './HeaderNav.css';

const { Header } = Layout;

const userMenu = (
	<Menu>
		<Menu.Item key="0">
			<Link to="/">
				<Icon type="user" /> Profile
			</Link>
		</Menu.Item>
		<Menu.Item key="1">
			<Link to="/">
				<Icon type="setting" /> User Settings
			</Link>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="2">
			<Link to="/user">
				<Icon type="logout" /> Log out
			</Link>
		</Menu.Item>
	</Menu>
);

export class HeaderNav extends Component {
	componentWillMount() {
		this.props.settingsActions.fetchSettings();
	}

	render() {
		return (
			<Header style={{ background: '#fff', paddingLeft: '16px' }}>
				<div className="header-left">
					<div id="app-headernav-logo-div">
						<Link to="/">
							<img src={logo} id="app-headernav-logo" alt="Flowist Logo" />
						</Link>
					</div>
				</div>
				<Icon
					className="header-trigger"
					type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
					onClick={this.props.toggle}
				/>
				<div className="header-right">
					<Dropdown trigger={[ 'hover', 'click' ]} overlay={userMenu} placement="bottomRight">
						<Avatar icon="user" />
					</Dropdown>
				</div>
			</Header>
		);
	}
}

HeaderNav.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
