import React, { Component } from 'react';
import Sidebar from '../Sidebar';

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
		<div>
			<Sidebar></Sidebar>
			<p>This is the overview page. It will hold their current flow and extra information.</p>
		</div>
		);
	}
}

export default OverviewPage;
