import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export class Tags extends Component {
    componentDidMount() {
        document.title = this.props.title + " |  Flowist";
    }

	render() {
		return (
			<Content>
				<div>This is tags content.</div>
			</Content>
		);
	}
}

export default Tags;
