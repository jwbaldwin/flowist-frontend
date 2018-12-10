import React, { Component } from 'react';
import { Box, Button, TextInput } from 'grommet';

export class LoginForm extends Component {
	render() {

		const loginBtnStyle = {
			fontWeight: 'bold',
			height: '50px'
		}

		return (
			<Box 
			alignContent='center'
			background='white'
			basis='1/3'
			direction='column'
			elevation='large'
			gap='medium'
			height='medium'
			justify='between'
			margin='medium'
			pad='xlarge'
			round='medium'
			>
				<TextInput
					size='medium'
					placeholder='username'
				/>
				<TextInput
					size='medium'
					placeholder='password'
					type='password'
				/>
				<Button 
					primary
					color='accent-1'
					label='login'
					style={loginBtnStyle}
					onClick={() => {}}/>
			</Box>
		);
	}
}

export default LoginForm;
