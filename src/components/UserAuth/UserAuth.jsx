import React, { Component } from 'react';
import { Tabs, Col, Divider } from 'antd';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { Github } from '../SocialLogin';
import './UserAuth.scss';
import '../AppMain/AppMain.scss';
import logo from '../../assets/images/flowist-main-light.png';

const TabPane = Tabs.TabPane;

function callback(key) {
	console.log(key);
}

export class UserAuth extends Component {
	render() {
		return (
			<div id="main-panel" className="centered">
				<Col xs={2} sm={7} md={8} lg={8} xl={9} />
				<Col xs={20} sm={10} md={8} lg={8} xl={6} id="main-panel-user-auth">
					<div className="card-container">
						<div id="app-logo-div">
							<img src={logo} id="app-logo" alt="Flowist Logo" />
						</div>
						<Tabs onChange={callback} type="card" style={{ textAlign: 'left' }}>
							<TabPane tab="Login" key="1">
								<div className="gutter-box">
									<LoginForm />
								</div>
							</TabPane>
							<TabPane tab="Sign Up" key="2">
								<div className="gutter-box">
									<SignUpForm />
								</div>
							</TabPane>
						</Tabs>
					</div>
					<Divider style={{ color: '#ccc' }}>or</Divider>
					<div id="social-login">
						<Github className="social-login-btn"/>
					</div>
				</Col>
				<Col xs={2} sm={7} md={8} lg={8} xl={9} />
			</div>
		);
	}
}

export default UserAuth;
