import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import WorkTimeline from './WorkTimeline';

const { Content } = Layout;

export class Work extends Component {
    render() {
        return (
            <Content>
                <WorkTimeline />
            </Content>
        );
    }
}

export default Work;
