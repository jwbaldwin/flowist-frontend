import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Spin, Menu } from 'antd';
import logo from '../../images/flowist.png';
import './HeaderNav.css';

const UserMenu = React.lazy(() => import('./UserMenu'));
const { Header } = Layout;

export class HeaderNav extends Component {
	state = {
		current: 'mail'
	};

	handleClick = (e) => {
		console.log('click ', e);
		this.setState({
			current: e.key
		});
	};

	render() {
		return (
			<Header style={{ paddingLeft: '16px' }} className={this.props.settings.theme}>
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
					<Suspense fallback={<Spin />}>
						<UserMenu {...this.props} />
					</Suspense>
				</div>
			</Header>
		);
	}
}

export default HeaderNav;
