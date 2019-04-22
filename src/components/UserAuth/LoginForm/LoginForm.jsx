import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../../../actions/userActions';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import './LoginForm.scss';
import '../UserAuth.scss';

const LoginButton = styled(Button)`
    background: ${({ theme }) => theme.primaryColor};
    box-shadow: ${({ theme }) => theme.boxShadow};
`;


export class LoginFormNormal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        document.title = "Log In |  Flowist";
    }

	handleSubmit = async (event) => {
		event.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				this.setState({isLoading: true})
				try {
					await Auth.signIn(values.email, values.password);
					this.handleSuccessfulLogin();
				} catch (e) {
					this.handleErrorLogin(e);
				}
			}
		});
	};

	handleSuccessfulLogin = async () => {
		const userDetails = await Auth.currentAuthenticatedUser();
		this.props.userActions.updateUser({
			...this.props.user,
			user: userDetails,
			isAuthenticated: true
		});
        this.setState({isLoading: false})
		this.props.history.push('/app');
		message.success('Logged in successfully!');
	};

	handleErrorLogin = async (e) => {
		this.props.showLoginError(e.message);
		this.setState({isLoading: false})
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
							size="large"
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
							size="large"
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
					<LoginButton
						block
						loading={this.state.isLoading}
						size="large"
						type="primary"
						htmlType="submit"
						className="login-form-button green-btn"
					>
						Log in
					</LoginButton>
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
