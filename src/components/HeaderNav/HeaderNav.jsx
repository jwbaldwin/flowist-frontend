import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Spin, Input, Row, Col } from 'antd';
import logo from '../../assets/images/flowist.png';
import logoLight from '../../assets/images/flowist-main-light.png';
import logoDark from '../../assets/images/flowist-main-dark.png';
import styled from 'styled-components';
import './HeaderNav.scss';

const UserMenu = React.lazy(() => import('./UserMenu'));
const { Header } = Layout;
const Search = Input.Search;

const StyledHeader = styled(Header)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.header};
    transiton: ${({ theme }) => theme.transiton};
    height: 40px;
    box-shadow: ${({ theme }) => theme.boxShadow};

    .nav-header-item  > span:hover, .nav-header-item img:hover {
        background: ${({theme}) => theme.background};
    }

`;

const StyledSearch = styled(Search)`
    transiton: ${({ theme }) => theme.transiton};

   .ant-input {
        height: 30px;
        margin: 5px 0;
        border-radius: 15px !important;
        color: ${({ theme }) => theme.defaultText};
        background-color: ${({ theme }) => theme.contentOther};
        border: ${({ theme }) => theme.border};
   }

   .ant-input-search-icon {
       color: ${({ theme }) => theme.defaultText};
   }
`;

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
			<StyledHeader>
				<Row>
					<Col span={1} />
					<Col span={5} className="nav-header-item">
						<Row type="flex" justify="start">
							<Icon
								className="header-trigger"
								type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.props.toggle}
							/>
							<Link to="/app">
								<img src={logo} id="app-headernav-logo" alt="Flowist Logo" />
							</Link>
							<Link to="/app">
								<img src={this.props.theme  === 'light'? logoLight : logoDark} id="app-headernav-logo-main" alt="Flowist Logo" />
							</Link>
						</Row>
					</Col>
					<Col span={10}>
						<StyledSearch placeholder="Search" onSearch={(value) => console.log(value)} />
					</Col>
                    <Col span={3}/>
					<Col span={4} className="nav-header-item">
					{' '}
						<Suspense fallback={<Spin />}>
							<UserMenu {...this.props} />
						</Suspense>
					</Col>
                    <Col span={1}/>
				</Row>
			</StyledHeader>
		);
	}
}

export default HeaderNav;
