import React, { Component } from 'react';
import { Layout } from 'antd';
import EmptyHome from './EmptyHome';

const { Content } = Layout;

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	    
    componentWillMount() {
		document.addEventListener('keydown', this.handleKeyPress.bind(this));
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress.bind(this));
	}

	handleKeyPress = () => {}

	render() {
		return (
			<Content
				className="centered"
				style={{ padding: 24, minHeight: '100vh' }}
				onKeyPress={() => this.handleKeyPress}
			>
				<EmptyHome />
			</Content>
		);
	}
}

export default Home;
