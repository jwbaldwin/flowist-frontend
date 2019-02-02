import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export class Tags extends Component {
	render() {
		return (
			<Content style={{ padding: 24, minHeight: '100vh' }}>
				<div>This is tags content.</div>
			</Content>
		);
	}
}

export default Tags;
