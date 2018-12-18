import React, { Component } from 'react';
import { Box, Button, TextInput } from 'grommet';

export class LoginForm extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  email: "",
		  password: ""
		};
	  }
	
	  validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	  }
	
	  handleChange = event => {
		this.setState({
		  [event.target.id]: event.target.value
		});
	  }
	
	  handleSubmit = event => {
		event.preventDefault();
	  }

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
			<form onSubmit={this.handleSubmit}>
				<TextInput
					size='medium'
					type='email'
					placeholder='email'
					id='email'
					value={this.state.email}
				/>
				<TextInput
					size='medium'
					type='password'
					placeholder='password'
					id='password'
					value={this.state.password}
				/>
			</form>
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
