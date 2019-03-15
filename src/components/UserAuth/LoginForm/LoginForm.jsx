import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../../../actions/userActions';
import { Auth } from "aws-amplify";
import './LoginForm.css';
import '../UserAuth.css';

export class LoginFormNormal extends Component {
	handleSubmit = async event => {
		event.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				this.props.userActions.updateUser({...this.props.user, isLoading: true});
                try {
                    await Auth.signIn(values.email, values.password);
                    this.props.userActions.updateUser({...this.props.user, isAuthenticated: true, isLoading: false});
                    this.props.history.push("/");
                    message.success("Logged in successfully!");
                } catch (e) {
                    this.props.showLoginError(e.message);
                    this.props.userActions.updateUser({...this.props.user, isLoading: false});
                }
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit} id="login-form">
				<Form.Item>
					{getFieldDecorator('email', {
						rules: [ { required: true, message: 'Please input your email!' } ]
					})(
						<Input
							size='large'
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Email"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [ { required: true, message: 'Please input your password!' } ]
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
					<Button
                        block
                        loading={this.props.user.isLoading}
                        size='large'
                        type="primary"
                        htmlType="submit"
                        className="login-form-button green-btn">
						Log in
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const LoginForm = Form.create({ name: 'normal_login' })(LoginFormNormal);

LoginForm.propTypes = {
	userActions: PropTypes.object,
	user: PropTypes.object
};

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));