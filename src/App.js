import React, { Component } from 'react';
import AppMain from './components/AppMain';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

export default App;
