import React, { Component } from 'react';
import { Layout, Icon, Col, Empty } from 'antd';
import WorkTimeline from './WorkTimeline';
import WorkInput from './WorkInput';
import { now } from 'moment';


const { Content } = Layout;

export class Work extends Component {
    state = {
        logs: []
    }

    logWork = (work) => {
        work.created = now();
        this.setState({
            logs: [...this.state.logs, work]
        })
    }

    render() {
        return (
            <Content className="centered">
                <Col span={24}>
                    <WorkTimeline logs={this.state.logs} />
                    <WorkInput log={this.logWork}/>
                </Col>
            </Content>
        );
    }
}

export default Work;
