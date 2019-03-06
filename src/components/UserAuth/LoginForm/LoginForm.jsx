import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './LoginForm.css';
import '../UserAuth.css';

export class LoginFormNormal extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit} id="login-form">
				<Form.Item>
					{getFieldDecorator('userName', {
						rules: [ { required: true, message: 'Please input your username!' } ]
					})(
						<Input
							size='large'
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Username"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [ { required: true, message: 'Please input your Password!' } ]
					})(
						<Input
							size='large'
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Password"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true
					})(<Checkbox className="login-form-remember-me">Remember me</Checkbox>)}
					<a className="login-form-forgot" href="/">
						Forgot password
					</a>
					<Button block size='large' type="primary" htmlType="submit" className="login-form-button green-btn">
						Log in
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const LoginForm = Form.create({ name: 'normal_login' })(LoginFormNormal);

export default LoginForm;
