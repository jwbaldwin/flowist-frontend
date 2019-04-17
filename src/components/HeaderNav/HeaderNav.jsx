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
            <StyledHeader style={{ paddingLeft: '16px' }}>
                <div className="header-left">
                    <div id="app-headernav-logo-div">
                        <Link to="/app">
                            <img src={logo} id="app-headernav-logo" alt="Flowist Logo" />
                        </Link>
                    </div>
                </div>
                <Icon
                    className="header-trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <div className='searchbar'>
                    <Search
                        placeholder="search your flows..."
                        onSearch={value => console.log(value)}
                        style={{ width: '40%', margin: '0 18px', background: 'unset' }}
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
