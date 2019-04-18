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
    background: ${({ theme }) => theme.backgroundColor};
    transiton: ${({ theme }) => theme.transiton};
`;

const ThemeDivider = styled(Menu.Divider)`
    background-color: ${({ theme }) => theme.contentBackgroundColor} !important;
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
            <Content Col xs={4} sm={4} md={4} lg={4} xl={4} style={{marginTop: '1vh', marginBottom: '1vh'}}>
                    {this.props.activeFlows.length > 0
                        ? (this.props.activeFlows.map((flow) =>
                            <div key={"/app/flows/" + flow.id}>
                                <Link to={"/app/flows/" + flow.id}>
                                    <Icon type={mapIcon(flow.activity)} />
                                    <span>{flow.title.replace(/^(.{15}[^\s]*).*/, "$1 ...")}</span>
                                </Link>
                            </div>
                        ))
                        : (
                            <div>
                                Add one!
                            </div>
                        )
                    }
                    <ThemeDivider />
					<div key="/app">
						<Link to="/app">
							<Icon type="coffee" />
							<span>#flows</span>
						</Link>
					</div>
                    <div key="/app/archive">
						<Link to="/app/archive">
							<Icon type="inbox" />
							<span>#archive</span>
						</Link>
					</div>
					<div key="/app/tags" disabled>
						<Link to="/app/tags">
							<Icon type="tags" />
							<span>#tags (beta)</span>
						</Link>
					</div>
					<div key="/app/settings" disabled>
						<Link to="/app/settings">
							<Icon type="share-alt" />
							<span>#insights (beta)</span>
						</Link>
					</div>
                    <divGroup>
                       <ThemeSwitch updateTheme={this.updateTheme} theme={this.props.settings.theme}/>
                    </divGroup>
            </Content>
        );
    }
}

export default withRouter(SideMenu);
