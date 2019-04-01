import React, { Component } from 'react';
import { Tabs, Col, Divider, Button, Alert } from 'antd';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './UserAuth.scss';
import '../AppMain/AppMain.scss';
import logo from '../../assets/images/flowist.png';

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
			<div id="main-panel">
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
						<Button type="default" block size="large" icon='github' style={{background: '#3a3a3a', borderColor: '#3a3a3a', color: 'rgba(255,255,255,0.95)'}}>
							Github
						</Button>
						<Button type="default" block size="large" icon='gitlab' style={{background: '#e24329', borderColor: '#e24329', color: 'rgba(255,255,255,0.95)'}}>
							Gitlab
						</Button>
						<Button type="default" block size="large" icon='facebook' style={{background: '#3b5998', borderColor: '#3b5998', color: 'rgba(255,255,255,0.95)'}}>
							Facebook
						</Button>
					</div>
				</Col>
				<Col xs={2} sm={7} md={8} lg={8} xl={9} />
			</div>
		);
	}
}

export default UserAuth;
