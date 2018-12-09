import React, { Component } from 'react';
import AppBar from '../AppBar';
import { Box } from 'grommet';

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
				<AppBar></AppBar>
				<Box flex align="center" justify="center">
					app body
					{this.state.isLoading ? <p>Loading...</p> : <p>{this.state.users}</p>}
				</Box>
			</Box>
		);
	}
}

export default AppMain;
