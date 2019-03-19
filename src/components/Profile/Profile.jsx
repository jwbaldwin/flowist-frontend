import React, { Component } from 'react';
import { Layout, Row, Col, Icon, Statistic, Card, Menu } from 'antd';
import './Profile.css';
const { Content } = Layout;

export class Settings extends Component {
    render() {
        console.log(this.props.user.attributes)
        // const user = this.props.user.attributes;
        // const { flows } = this.props.flows;
        return (
            <Content style={{ margin: 24 }}>
                <Row type="flex" justify="space-around" align="top">
                    <Col xs={24} sm={24} md={24} lg={8}>
                        <Card
                            id="personal-settings"
                            title="Personal Settings"
                            size="small">
                            <Menu
                                id="personal-settings-menu"
                                defaultSelectedKeys="1"
                                mode="inline"
                            >
                                <Menu.Item key="1">
                                        <Icon type="user" />
                                        <span>Profile</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                        <Icon type="setting" />
                                        <span>Account</span>
                                </Menu.Item>
                                <Menu.Item key="3">
                                        <Icon type="fire" />
                                        <span>Danger Zone</span>
                                </Menu.Item>
                            </Menu>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <Row type="flex" justify="space-around" align="top">
                            <Col xs={24} sm={24} md={24} lg={22} style={{ marginBottom: '1em' }}>
                                <Card
                                    id="stats"
                                    title="Stats"
                                    size="small">
                                    <Col sm={24} md={24} lg={12}>
                                        <Statistic title="Feedback" value={1128} prefix={<Icon type="like" />} />
                                    </Col>
                                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                                </Card>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={22}>
                                <Card
                                    id="account-info"
                                    title="Personal Settings"
                                    size="small">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        );
    }
}

export default Settings;
