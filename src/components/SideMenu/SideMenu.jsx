import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import './SideMenu.scss';

const { Content } = Layout;

const StyledItem = styled(Menu.Item)`
    border-radius: 8px;

    &.ant-menu-item-selected {
        background-color: ${({ theme }) => theme.content};
        box-shadow ${({ theme }) => theme.boxShadow};
    }

    &.ant-menu-item-selected > a {
        color: ${({ theme }) => theme.primaryColor}
    }

    &.ant-menu-item-active {
        background-color: ${({ theme }) => theme.content};
        box-shadow ${({ theme }) => theme.boxShadow};
    }

    &.ant-menu-item-active > a {
        color: ${({ theme }) => theme.defaultColor}
    }
`;

const StyledMenu = styled(Menu)`
    color: ${({ theme }) => theme.defaultText};
    background: transparent !important;
    transiton: ${({ theme }) => theme.transitonFaster};
    font-weight: 600 !important;
    font-size: 18px;
    border: none;
`;

const ThemeDivider = styled(Menu.Divider)`
    background-color: ${({ theme }) => theme.content};
    height: 2px !important;
    width:  90%;
    margin-bottom: 1vh;
`;

class SideMenu extends Component {
    render() {
        return (
            <Content>
                <StyledMenu style={{ width: '100% !important' }} mode="vertical" theme={this.props.settings.theme} defaultSelectedKeys={[this.props.location.pathname]}>
					<StyledItem className='menu-item' key="/app">
						<Link to="/app">
							<Icon type="rest" theme="filled"/>
							<span>Flows</span>
						</Link>
					</StyledItem>
                    <StyledItem className='menu-item' key="/app/archive">
						<Link to="/app/archive">
							<Icon type="hdd" theme="filled"/>
							<span>Archive</span>
						</Link>
					</StyledItem>
					<StyledItem className='menu-item' key="/app/tags" disabled>
						<Link to="/app/tags">
							<Icon type="tags" theme="filled"/>
							<span>Tags (beta)</span>
						</Link>
					</StyledItem>
					<StyledItem className='menu-item' key="/app/settings" disabled>
						<Link to="/app/settings">
							<Icon type="share-alt" />
							<span>Insights (beta)</span>
						</Link>
					</StyledItem>
                </StyledMenu>
            </Content>
        );
    }
}

export default withRouter(SideMenu);
