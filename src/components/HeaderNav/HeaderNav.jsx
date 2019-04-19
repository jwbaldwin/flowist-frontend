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

    .nav-header-item:hover {
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

const LogoText = styled.h1`color: ${({ theme }) => theme.brightText};`;

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
					<Col span={1} />
					<Col span={6} className="nav-header-item">
                    	<Icon
							className="header-trigger"
							type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.props.toggle}
						/>
						<div id="app-headernav-logo-div">
							<Link to="/app">
								<img src={logo} id="app-headernav-logo" alt="Flowist Logo" />
								<LogoText id="app-header-logo-title"> Flowist</LogoText>
							</Link>
						</div>
					</Col>
					<Col span={12}>
						<StyledSearch placeholder="Search" onSearch={(value) => console.log(value)} />
					</Col>
                    <Col span={2}/>
					<Col span={3} className="nav-header-item">
					{' '}
						<Suspense fallback={<Spin />}>
							<UserMenu {...this.props} />
						</Suspense>
					</Col>
                    <Col span={2}/>
				</Row>
			</StyledHeader>
		);
	}
}

export default HeaderNav;
