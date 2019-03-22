import React, { Component } from 'react';
import { Layout, Row, Col, Icon, Statistic, Card, Tabs, Button } from 'antd';
import ProfileHeader from './ProfileHeader';
import Overview from './Overview';
import './Profile.css';

const { Content } = Layout;
const TabPane = Tabs.TabPane;

export class Profile extends Component {
    render() {
        const user = this.props.user.attributes;
        const flows = this.props.flows;
        return (
            <Content className="profile" style={{margin: 24}} style={{ textAlign: 'center' }}>
                <Row type="flex" justify="space-around" align="top">
                    <Col span={24}>
                        <ProfileHeader user={user} />
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><Icon type="user" />Profile</span>} key="1">
                                <Overview flows={flows}/>
                            </TabPane>
                            <TabPane tab={<span><Icon type="setting" />Account</span>} key="2">
                                Tab 2
                            </TabPane>
                            <TabPane tab={<span><Icon type="fire" />Danger Zone</span>} key="3">
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

// <Col xs={24} sm={24} md={24} lg={16}>
//     <Row type="flex" justify="space-around" align="top">
//         <Col xs={24} sm={24} md={24} lg={22} style={{ marginBottom: '1em' }}>
//             <Card
//                 id="stats"
//                 title="Stats"
//                 size="small">
//                 <Col sm={24} md={24} lg={12}>
//                     <Statistic title="Feedback" value={1128} prefix={<Icon type="like" />} />
//                 </Col>
//                 <Statistic title="Unmerged" value={93} suffix="/ 100" />
//             </Card>
//         </Col>
//         <Col xs={24} sm={24} md={24} lg={22}>
//             <Card
//                 id="account-info"
//                 title="Personal Settings"
//                 size="small">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//             </Card>
//         </Col>
//     </Row>
// </Col>