import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

export class AppMain extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			users: []
		};
	}

	componentDidMount() {
		this.setState({ isLoading: true });

		fetch('/api/users')
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					users: data,
					isLoading: false
				})
			)
			.catch((e) => console.error(e));
	}

	render() {
		return (
			<Layout>
				<Content style={{ margin: '16px 16px' }}>
					<div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>This is content.</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Novu Note ©2019 Created by James Baldwin</Footer>
			</Layout>
		);
	}
}

export default AppMain;
