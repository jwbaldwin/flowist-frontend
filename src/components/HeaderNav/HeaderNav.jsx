import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Spin, Input } from 'antd';
import logo from '../../assets/images/flowist-teal.png';
import styled from 'styled-components';
import './HeaderNav.scss';

const UserMenu = React.lazy(() => import('./UserMenu'));
const { Header } = Layout;
const Search = Input.Search;

const StyledHeader = styled(Header)`
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.backgroundColor};
    transiton: ${({ theme }) => theme.transiton};
    height: 45px;
    box-shadow: ${({ theme }) => theme.boxShadow};
`;

const StyledSearch = styled(Search)`
    transiton: ${({ theme }) => theme.transiton};
    width: 50% !important;

   .ant-input {
        height: 34px;
        border-radius: 100px !important;
        color: ${({ theme }) => theme.textColor};
        background-color: ${({ theme }) => theme.contentBackgroundColor};
        border: 1px solid ${({ theme }) => theme.secondaryContentBackgroundColor};
   }

   .ant-input-search-icon {
       color: ${({ theme }) => theme.textColor};
   }
`;

const LogoText = styled.h1`
    color: ${({ theme }) => theme.textColor};
`


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
            <StyledHeader style={{ paddingLeft: '5%' }}>
                <div className="header-left">
                    <div id="app-headernav-logo-div">
                        <Link to="/app">
                            <img src={logo} id="app-headernav-logo" alt="Flowist Logo" />
                            <LogoText id="app-header-logo-title">
                                {' '}
                                flowist
						    </LogoText>
                        </Link>
                    </div>
                </div>
                <Icon
                    className="header-trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <div className='searchbar'>
                    <StyledSearch
                        placeholder="Search"
                        onSearch={value => console.log(value)}
                    />
                </div>
                <div className="header-right">
                    <Suspense fallback={<Spin />}>
                        <UserMenu {...this.props} />
                    </Suspense>
                </div>
            </StyledHeader>
        );
    }
}

export default HeaderNav;
