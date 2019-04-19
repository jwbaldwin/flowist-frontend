import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
import { mapIcon } from '../../common';
import logo from '../../assets/images/flowist.png';
import logoWhite from '../../assets/images/flowist-white.png';
import logoTeal from '../../assets/images/flowist-teal.png';
import ThemeSwitch from '../ThemeSwitch';
import styled from 'styled-components';
import './SideMenu.scss';

const { Content } = Layout;

const StyledMenu = styled(Menu)`
    color: ${({ theme }) => theme.textColor};
    background: transparent !important;
    transiton: ${({ theme }) => theme.transiton};
    font-weight: bolder !important;
`;

const StyledItem = styled(Menu.Item)`
    border: 1px solid ${({ theme }) => theme.contentBackgroundColor};
    border-radius: 8px;

    .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
        background-color: ${({ theme }) => theme.secondaryContentBackgroundColor};
    }
`;

const ThemeDivider = styled(Menu.Divider)`
    background-color: ${({ theme }) => theme.backgroundColor};
    width:  90%;
`;

const LogoText = styled.h1`
    color: ${({ theme }) => theme.textColor};
`

class SideMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 80
        };
    }

    onBreakpoint = (broken) => {
        if (broken) {
            this.setState({ width: 0 });
        } else {
            this.setState({ width: 80 });
        }
    };

    updateTheme = () => {
        this.props.settingsActions.updateSettings(
            Object.assign({}, this.props.settings, { theme: this.props.settings.theme === 'light' ? 'dark' : 'light' })
        );
    };

    render() {
        return (
            <Content style={{marginTop: '50%'}}>
                <StyledMenu style={{ width: 256 }} mode="vertical" theme={this.props.settings.theme}>
                    {this.props.activeFlows.length > 0
                        ? (this.props.activeFlows.map((flow) =>
                            <StyledItem key={"/app/flows/" + flow.id}>
                                <Link to={"/app/flows/" + flow.id}>
                                    <Icon type={mapIcon(flow.activity)} />
                                    <span>{flow.title.replace(/^(.{15}[^\s]*).*/, "$1 ...")}</span>
                                </Link>
                            </StyledItem>
                        ))
                        : (
                            <StyledItem>
                                Add one!
                            </StyledItem>
                        )
                    }
                    <ThemeDivider />
					<StyledItem key="/app">
						<Link to="/app">
							<Icon type="coffee" />
							<span>#flows</span>
						</Link>
					</StyledItem>
                    <StyledItem key="/app/archive">
						<Link to="/app/archive">
							<Icon type="inbox" />
							<span>#archive</span>
						</Link>
					</StyledItem>
					<StyledItem key="/app/tags" disabled>
						<Link to="/app/tags">
							<Icon type="tags" theme="filled"/>
							<span>#tags (beta)</span>
						</Link>
					</StyledItem>
					<StyledItem key="/app/settings" disabled>
						<Link to="/app/settings">
							<Icon type="share-alt" />
							<span>#insights (beta)</span>
						</Link>
					</StyledItem>
                    <divGroup>
                       <ThemeSwitch updateTheme={this.updateTheme} theme={this.props.settings.theme}/>
                    </divGroup>
                </StyledMenu>
            </Content>
        );
    }
}

export default withRouter(SideMenu);
