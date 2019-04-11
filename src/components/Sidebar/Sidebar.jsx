import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { mapIcon } from '../../common';
import logo from '../../assets/images/flowist.png';
import logoWhite from '../../assets/images/flowist-white.png';
import logoTeal from '../../assets/images/flowist-teal.png';
import ThemeSwitch from './ThemeSwitch';
import styled from 'styled-components';
import './Sidebar.scss';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.backgroundColor};
    transiton: ${({ theme }) => theme.transiton};
`;

const StyledMenu = styled(Menu)`
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.backgroundColor};
    transiton: ${({ theme }) => theme.transiton};
`;

const ThemeDivider = styled(Menu.Divider)`
    background-color: ${({ theme }) => theme.contentBackgroundColor} !important;
`;

const LogoText = styled.h1`
    color: ${({ theme }) => theme.textColor};
`

class Sidebar extends Component {
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
			<Sider
				className="sider"
				theme={this.state.theme}
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
			>
				<div id="app-sidebar-logo-div">
					<Link to="/app">
						<img src={logoTeal} id="app-sidebar-logo" alt="Flowist Logo" />
						<LogoText id="app-sidebar-logo-title">
							{' '}
							flowist
						</LogoText>
					</Link>
				</div>
				<StyledMenu
                    theme={this.props.settings.theme}
					defaultSelectedKeys={[ this.props.location.pathname ]}
					mode="inline"
				>
                    <ThemeDivider />
                    { this.props.activeFlows.length > 0
                        ? (this.props.activeFlows.map((flow) =>
                               <Menu.Item key={"/app/flows/" + flow.id}>
                                    <Link to={"/app/flows/" + flow.id}>
                                        <Icon type={mapIcon(flow.activity)} />
                                        <span>{flow.title.replace(/^(.{15}[^\s]*).*/, "$1 ...")}</span>
                                    </Link>
                                </Menu.Item>
                            ))
                        : (
                            <Menu.Item>
                                    Add one!
                            </Menu.Item>
                        )
                    }
                    <ThemeDivider />
					<Menu.Item key="/app">
						<Link to="/app">
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
