import React, { Component } from 'react';
import AppMain from './components/AppMain';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
					<Route component={AppMain} />
				</Switch>
			</BrowserRouter>
		);
	}
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
