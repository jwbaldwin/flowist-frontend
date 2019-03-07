import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export class Tags extends Component {
	render() {
		return (
			<Content style={{ padding: 24 }}>
				<div>This is tags content.</div>
			</Content>
		);
	}
}

export default Tags;
