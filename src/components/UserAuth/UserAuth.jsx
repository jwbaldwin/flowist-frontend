import React, { Component } from 'react';
import { Tabs, Col, Divider, Button, Icon, Alert } from 'antd';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './UserAuth.css';
import '../AppMain/AppMain.css';
import logo from '../../images/flowist.png';

const TabPane = Tabs.TabPane;

function callback(key) {
	console.log(key);
}

class UserAuth extends Component {
	state = {
		errorShow: false,
		error: ''
	};

	handleClose = () => {
		this.setState({ errorShow: false });
	};

	showError = (message) => {
		this.setState({ errorShow: true, error: message });
	};

	render() {
		const errorAlert = (
			<Alert
				style={{ marginBottom: 16, textAlign: 'left' }}
				message="Error"
				description={this.state.error}
				showIcon
				type="error"
				closable
				afterClose={this.handleClose}
			/>
		);

		return (
			<div id="main-panel" className="centered">
				<Col xs={2} sm={7} md={8} lg={8} xl={9} />
				<Col xs={20} sm={10} md={8} lg={8} xl={6} id="main-panel-user-auth">
					<div className="card-container">
						<div id="app-logo-div">
							<img src={logo} id="app-logo" alt="Flowist Logo" />
						</div>
						<Tabs onChange={callback} type="card" style={{ textAlign: 'center' }}>
							<TabPane tab="Login" key="1">
								<div className="gutter-box">
									{this.state.errorShow ? errorAlert : null}
									<LoginForm showLoginError={this.showError} />
								</div>
							</TabPane>
							<TabPane tab="Sign Up" key="2">
								<div className="gutter-box">
									{this.state.errorShow ? errorAlert : null}
									<SignUpForm showSignUpError={this.showError} />
								</div>
							</TabPane>
						</Tabs>
					</div>
					<Divider style={{ color: '#ccc' }}>or</Divider>
					<div id="social-login">
						<Button type="default" block>
							<Icon type="github" />Login with Github
						</Button>
						<Button type="default" block>
							<Icon type="gitlab" />Login with Gitlab
						</Button>
						<Button type="default" block>
							<Icon type="google" />Login with Google
						</Button>
					</div>
				</Col>
				<Col xs={2} sm={7} md={8} lg={8} xl={9} />
			</div>
		);
	}
}

export default UserAuth;
