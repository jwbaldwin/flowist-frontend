import React, { Component } from 'react';
import { Box } from 'grommet';
import LoginForm from './LoginForm';

export class Login extends Component {
	render() {
		return (
			<Box
                flex
				tag="login"
				direction="row"
				align="center"
				justify="center"
				background="brand"
			>
                <LoginForm></LoginForm>
            </Box>
		);
	}
}

export default Login;
