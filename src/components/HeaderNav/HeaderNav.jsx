import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Spin, Input, Row, Col } from 'antd';
import logo from '../../assets/images/flowist-teal.png';
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

const LogoText = styled.h1`color: ${({ theme }) => theme.defaultText};`;

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
				<Row gutter={24}>
					<Col xs={0} sm={0} md={1} lg={1} xl={1} />
					<Col xs={0} sm={0} md={6} lg={6} xl={6}>
						<div id="app-headernav-logo-div">
							<Link to="/app">
								<img src={logo} id="app-headernav-logo" alt="Flowist Logo" />
								<LogoText id="app-header-logo-title"> flowist</LogoText>
							</Link>
						</div>
						<Icon
							className="header-trigger"
							type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.props.toggle}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={12} >
						<StyledSearch placeholder="Search" onSearch={(value) => console.log(value)} />
					</Col>
                    <Col xs={0} sm={0} md={2} lg={2} xl={2}/>
					<Col xs={0} sm={0} md={3} lg={3} xl={3}>
					{' '}
						<Suspense fallback={<Spin />}>
							<UserMenu {...this.props} />
						</Suspense>
					</Col>
				</Row>
			</StyledHeader>
		);
	}
}

export default HeaderNav;
