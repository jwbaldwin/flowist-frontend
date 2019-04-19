import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
import { mapIcon } from '../../common';
import logo from '../../assets/images/flowist.png';
import logoWhite from '../../assets/images/flowist-white.png';
import logoTeal from '../../assets/images/flowist-teal.png';
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
    font-weight: bolder !important;
`;

const ThemeDivider = styled(Menu.Divider)`
    background-color: ${({ theme }) => theme.content};
    width:  90%;
    margin-bottom: 1vh;
`;

const LogoText = styled.h1`
    color: ${({ theme }) => theme.defaultText};
`

class SideMenu extends Component {
    render() {
        return (
            <Content style={{marginTop: '50%'}}>
                <StyledMenu style={{ width: 256 }} mode="vertical" theme={this.props.settings.theme} defaultSelectedKeys={[this.props.location.pathname]}>
                    {this.props.activeFlows.length > 0
                        ? (this.props.activeFlows.map((flow) =>
                            <StyledItem className='menu-item' key={"/app/flows/" + flow.id}>
                                <Link to={"/app/flows/" + flow.id}>
                                    <Icon type={mapIcon(flow.activity)} />
                                    <span>{flow.title.replace(/^(.{15}[^\s]*).*/, "$1 ...")}</span>
                                </Link>
                            </StyledItem>
                        ))
                        : (
                            <StyledItem className='menu-item'>
                                Add one!
                            </StyledItem>
                        )
                    }
                    <ThemeDivider />
					<StyledItem className='menu-item' key="/app">
						<Link to="/app">
							<Icon type="coffee" />
							<span>#flows</span>
						</Link>
					</StyledItem>
                    <StyledItem className='menu-item' key="/app/archive">
						<Link to="/app/archive">
							<Icon type="inbox" />
							<span>#archive</span>
						</Link>
					</StyledItem>
					<StyledItem className='menu-item' key="/app/tags" disabled>
						<Link to="/app/tags">
							<Icon type="tags" theme="filled"/>
							<span>#tags (beta)</span>
						</Link>
					</StyledItem>
					<StyledItem className='menu-item' key="/app/settings" disabled>
						<Link to="/app/settings">
							<Icon type="share-alt" />
							<span>#insights (beta)</span>
						</Link>
					</StyledItem>
                </StyledMenu>
            </Content>
        );
    }
}

export default withRouter(SideMenu);
