import React, { Component } from 'react';
import { Box } from 'grommet';

export class Login extends Component {
	render() {
		return (
			<Box
				tag="login"
				direction="row"
				align="center"
				justify="between"
				background="brand"
				pad={{ left: 'medium', right: 'small', vertical: 'medium' }}
				elevation="medium"
				style={{ zIndex: '1' }}
			/>
		);
	}
}

export default Login;
