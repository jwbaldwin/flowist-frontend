import React, { Component, Suspense } from 'react';
import AppMain from './components/AppMain';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as userActions from './actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd'
import { Auth } from 'aws-amplify';
import NotFound from './components/NotFound';
import './App.css';

const UserAuth = React.lazy(() => import('./components/UserAuth'));

class App extends Component {
	state = {
		isAuthenticating: true
	};

	async componentDidMount() {
		try {
			await Auth.currentSession();
			const userDetails = await Auth.currentAuthenticatedUser();
			this.props.userActions.updateUser({ ...this.props.user, user: userDetails, isAuthenticated: true });
		} catch (e) {
			console.error(e);
		}
		this.setState({ isAuthenticating: false });
	}

	render() {
		return (
			!this.state.isAuthenticating && (
				<BrowserRouter>
					<Switch>
						<Route
							exact
							path="/user"
							component={() => (
								<Suspense fallback={<Spin style={{top: '35vh', left: '50vw', position: 'absolute'}}/>}>
									<UserAuth />
								</Suspense>
							)}
						/>
						<ProtectedRoute path="/app" authed={this.props.user.isAuthenticated} component={AppMain} />
                        <Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			)
		);
	}
}

function ProtectedRoute({ component: Component, authed, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				authed === true ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/user', state: { from: props.location } }} />
				)}
		/>
	);
}

App.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
