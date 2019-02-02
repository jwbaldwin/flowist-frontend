import React, { Component } from 'react';
import AppMain from './components/AppMain';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route component={AppMain} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
