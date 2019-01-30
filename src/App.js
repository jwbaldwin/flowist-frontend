import React, { Component } from 'react';
import AppMain from './components/AppMain';
import Login from './components/Login';
import TagsPage from './components/TagsPage';
import HistoryPage from './components/HistoryPage';
import SettingsPage from './components/SettingsPage';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Layout style={{ minHeight: '100vh' }}>
					<Sidebar />
					<Switch>
						<Route exact path="/" component={AppMain} />
						<Route exact path="/tags" component={TagsPage} />
						<Route exact path="archive" component={HistoryPage} />
						<Route exact path="settings" component={SettingsPage} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</Layout>
			</BrowserRouter>
		);
	}
}

export default App;
