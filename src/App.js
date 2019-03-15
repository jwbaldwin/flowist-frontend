import React, { Component } from 'react';
import AppMain from './components/AppMain';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserAuth from './components/UserAuth';
import './App.css';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/user" component={UserAuth} />
					<ProtectedRoute authed={this.props.user.isAuthenticated} component={AppMain} />
				</Switch>
			</BrowserRouter>
		);
	}
}

function ProtectedRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/user', state: {from: props.location}}} />}
    />
  )
}

App.propTypes = {
	user: PropTypes.object
};

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, null)(App);
