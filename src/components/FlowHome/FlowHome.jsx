import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import FlowItem from '../FlowItem';
import './FlowHome.css';

const { Content } = Layout;

export class Settings extends Component {
	render() {
		return (
            <Content>
                <Row type="flex" justify="space-around" align="middle">
                    { this.props.flows.map((flow, key) =>
                            <Col xs={24} sm={24} md={18} lg={16} xl={11} style={{marginTop: '1vh', marginBottom: '1vh'}}>
                                    <FlowItem flow={flow} key={key} />
                            </Col>
                        )
                    }
                </Row>
            </Content>
		);
	}
}

export default Settings;