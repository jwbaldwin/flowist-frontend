import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export class Settings extends Component {
	render() {
		return (
			<Content style={{ padding: 24, minHeight: '100vh' }}>
				<div>This is settings content.</div>
			</Content>
		);
	}
}

export default Settings;
