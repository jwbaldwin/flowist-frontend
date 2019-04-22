import React, { Component } from 'react';
import { Layout, Row, Col, Icon, Tabs } from 'antd';
import ProfileHeader from './ProfileHeader';
import Overview from './Overview';
import UserProfile from './UserProfile';
import styled from 'styled-components';
import './Profile.scss';

const { Content } = Layout;
const TabPane = Tabs.TabPane;

const StyledContent = styled(Content)`
    color: ${({ theme }) => theme.defaultText};
	background: ${({ theme }) => theme.content};
`;

export class Profile extends Component {
    componentDidMount() {
        document.title = this.props.title + " |  Flowist";
    }

    render() {
        const user = this.props.user.attributes;
        const flows = this.props.flows;
        return (
            <Content className="profile" style={{ textAlign: 'center', padding: 24}}>
                <Row type="flex" justify="space-around" align="top">
                    <Col span={24}>
                        <ProfileHeader user={user} />
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><Icon type="dashboard" />Overview</span>} key="1">
                                <Overview flows={flows}/>
                            </TabPane>
                            <TabPane tab={<span><Icon type="user" />Profile</span>} key="2">
                                <UserProfile user={user} />
                            </TabPane>
                            <TabPane tab={<span><Icon type="setting" />Account</span>} key="3">
                                Tab 2
                            </TabPane>
                            <TabPane tab={<span><Icon type="fire" />Danger Zone</span>} key="4">
                                Tab 3
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Content>
        );
    }
}

export default Profile;