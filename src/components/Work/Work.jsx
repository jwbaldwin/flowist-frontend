import React, { Component } from 'react';
import { Layout, Icon, Col } from 'antd';
import WorkTimeline from './WorkTimeline';
import WorkInput from './WorkInput';


const { Content } = Layout;

export class Work extends Component {
    state = {
        logs: []
    }

    logWork = (work) => {
        console.log(work)
        this.setState({
            logs: {...this.state.logs, work}
        })
    }

    render() {
        return (
            <Content className="centered">
                <Col span={24}>
                    <WorkTimeline work={this.state.work} />
                    <WorkInput log={this.logWork}/>
                </Col>
            </Content>
        );
    }
}

export default Work;
