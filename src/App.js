import React, { Component } from 'react';
import AppMain from './components/AppMain';
import Login from './components/Login'
import OverviewPage from './components/OverviewPage'
import HistoryPage from './components/HistoryPage'
import SettingsPage from './components/SettingsPage'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
	render() {
		return (
      <BrowserRouter>
				<Switch>
					<Route exact path="/" component={AppMain} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/overview" component={OverviewPage} /> 
					<Route exact path="/history" component={HistoryPage} />
					<Route exact path="/settings" component={SettingsPage} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
