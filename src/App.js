import React, { Component } from 'react';
import AppMain from './components/AppMain';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as userActions from './actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Auth } from "aws-amplify";
import UserAuth from './components/UserAuth';
import './App.css';

class App extends Component {
    state = {
        isAuthenticating: true,
    }

    async componentDidMount() {
        try {
            await Auth.currentSession();
            const userDetails = await Auth.currentAuthenticatedUser();
            this.props.userActions.updateUser({...this.props.user, user: userDetails, isAuthenticated: true})
        }
        catch(e) {
            console.error(e)
        }
        this.setState({isAuthenticating: false});
    }


	render() {
		return (
            !this.state.isAuthenticating &&
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
