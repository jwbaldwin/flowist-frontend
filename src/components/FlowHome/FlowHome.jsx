import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';
// import {
//   CSSTransition,
//   TransitionGroup,
// } from 'react-transition-group';
import FlowItem from '../FlowItem';
import Work from '../Work';
import './FlowHome.scss';

const { Content } = Layout;

export class Settings extends Component {
	render() {
		return (
            <Content>
                <Row type="flex" justify="space-around" align="middle">
                    { this.props.flows
                        .map((flow, key) =>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{marginTop: '1vh', marginBottom: '1vh'}} key={key}>
                                <FlowItem flow={flow} key={key} />
                                <Work flow_id={flow.id}/>
                            </Col>
                        )
                    }
                </Row>
            </Content>
		);
	}
}

export default Settings;

// <FlowHomeHeader activity={flow.activity} created={flow.created}/>