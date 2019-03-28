import React, { Component } from 'react';
import { Card, Button, Typography, Row, Icon, Divider } from 'antd';
import TimeAgo from 'react-timeago'
import logo from '../../../images/flowist.png';
import './FlowHomeHeader.css';

const { Text } = Typography;


export class FlowHomeHeader extends Component {
	render() {
		return (
			<Card 
                className="flow-home-header"
                style={{ padding: 24 }}
            >
				<div style={{marginBottom: '2em', fontWeight: '800'}}>You were <Text code>{this.props.activity}</Text> around <Text code>{<TimeAgo date={this.props.created}/>}</Text></div>
                <Divider style={{ color: '#ccc' }}>quick actions</Divider>
                <Row type="flex" justify="space-around" align="middle">
                    <Button className='header-btn' size='large'>
                        <Icon type='check-circle' style={{color: '#52c41a', fontSize: '20px'}}/>
                        <span className='btn-text'>I'm finished</span>
                    </Button>
                    <Button className='header-btn' size='large'>
                        <img src={logo} id='flow-logo' alt="Flowist Logo" />
                        <span className='btn-text'>Keep flowing</span>
                    </Button>
                </Row>
			</Card>
		);
	}
}

export default FlowHomeHeader;