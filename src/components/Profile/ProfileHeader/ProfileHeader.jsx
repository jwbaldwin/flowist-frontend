import React, { Component } from 'react';
import { Layout, Avatar, Typography } from 'antd';
import './ProfileHeader.scss';

const { Content } = Layout;
const { Title, Text } = Typography;

export class ProfileHeader extends Component {
    render() {
        const { user } = this.props;


        return (
            <Content style={{ padding: 24 }}>
                <div className="header-item">
                    <Avatar size={90} icon="user" />
                </div>
                <div className="header-item">
                    <Title level={4}>{user.name + " " + user.family_name}</Title>
                    <Text type="secondary">@ {user.email.substring(0, user.email.indexOf('@'))}</Text>
                </div>
            </Content >
        );
    }
}

export default ProfileHeader;
