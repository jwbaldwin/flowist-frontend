import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import { Box } from 'grommet';
import FlowItem from '../FlowItem/FlowItem';

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
			<Box direction="row" flex>
				<Sidebar></Sidebar>
				<FlowItem></FlowItem>
			</Box>
		);
	}
}

export default AppMain;
