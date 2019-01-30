import React, { Component } from 'react';

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

		// const loginBtnStyle = {
		// 	fontWeight: 'bold',
		// 	height: '50px'
		// }

		return (
			<div>	
				
			</div>
		);
	}
}

export default LoginForm;
