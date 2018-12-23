import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import { Box } from 'grommet';

export class OverviewPage extends Component {
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
				<Box flex align="center" justify="center">
					This is the overview page. It will hold their current flow and extra information.
				</Box>
			</Box>
		);
	}
}

export default OverviewPage;
