import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export class Settings extends Component {
    componentDidMount() {
        document.title = this.props.title + " |  Flowist";
    }

	render() {
		return (
			<Content>
				<div>This is settings content.</div>
			</Content>
		);
	}
}

export default Settings;
