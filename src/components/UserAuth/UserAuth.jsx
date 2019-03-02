import React, { Component } from 'react';
import { Tabs, Col, Divider, Button, Icon } from 'antd';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './UserAuth.css';

const TabPane = Tabs.TabPane;

function callback(key) {
	console.log(key);
}

export class UserAuth extends Component {
	render() {
		return (
			<div id="main-panel" className="centered">
				<Col xs={2} sm={7} md={8} lg={9} xl={9} />
				<Col xs={20} sm={10} md={8} lg={6} xl={6} id="main-panel-user-auth">
					<Tabs onChange={callback} type="card" style={{ 'text-align': 'left' }}>
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
				<Col xs={2} sm={7} md={8} lg={9} xl={9} />
			</div>
		);
	}
}

export default UserAuth;
