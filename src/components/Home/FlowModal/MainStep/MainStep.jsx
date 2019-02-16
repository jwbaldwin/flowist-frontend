import React, { Component } from 'react';
import { Input } from 'antd';
import './MainStep.css';

const { TextArea } = Input;

export class MainStep extends Component {

	render() {
		return (
			<TextArea 
				id='content'
				placeholder="> Error dump" 
				autosize={{ minRows: 7 }} 
				onChange={this.props.handleChange('content')}
				onPressEnter={this.props.handleChange('content')} />
		);
	}
}

export default MainStep;
