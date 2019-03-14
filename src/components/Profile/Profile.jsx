import React, { Component } from 'react';
import { Layout, Row, Col, Avatar, Icon, Statistic } from 'antd';

const { Content } = Layout;

export class Settings extends Component {
	render() {
		return (
			<Content style={{ margin: 48 }}>
				<Row gutter={32}>
                    <Col span={8}>
                        <Content style={{backgroundColor: '#fff', padding: 16}}>
                        <Avatar size={64} icon="user" />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Content>
                    </Col>
                    <Row>
                        <Col span={16}>
                        <Content style={{backgroundColor: '#fff', padding: 16, marginBottom: 16}}>
                            <Col span={12}>
                                <Statistic title="Feedback" value={1128} prefix={<Icon type="like" />} />
                            </Col>
                            <Statistic title="Unmerged" value={93} suffix="/ 100" />
                        </Content>
                        </Col>
                        <Col span={16}>
                        <Content style={{backgroundColor: '#fff', padding: 16}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Content>
                        </Col>
                    </Row>
                </Row>
			</Content>
		);
	}
}

export default Settings;
