import React, { Component } from 'react';
import { Icon, Input, Radio } from 'antd';
import './InfoStep.css';

export class InfoStep extends Component {
	render() {
		return (
			<div>
				<div id='activity-group'>
					<label htmlFor="activity-group">What where you doing?</label>
					<Radio.Group
                        id="activity-group"
                        onChange={this.props.handleChange('activity')}
                        value={this.props.flowData.activity} >
						<Radio.Button value='coding'>
							<Icon type="laptop" /> Programming
						</Radio.Button>
						<Radio.Button value='researching'>
							<Icon type="search" /> Researching
						</Radio.Button>
						<Radio.Button value='debugging'>
							<Icon type="alert" /> Debugging
						</Radio.Button>
					</Radio.Group>
				</div>
				<div id='title'>
					<label htmlFor="title">Brief description</label>
					<Input
						id="title"
						placeholder="Need to stop infinite while loop..."
						value={this.props.flowData.title}
						onChange={this.props.handleChange('title')}
						onPressEnter={this.props.handleChange('title')} />
				</div>
			</div>
		);
	}
}

export default InfoStep;
