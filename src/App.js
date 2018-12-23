import React, { Component } from 'react';
import { Box, Grommet } from 'grommet';
import AppMain from './components/AppMain';
import Login from './components/Login'
import OverviewPage from './components/OverviewPage'
import HistoryPage from './components/HistoryPage'
import SettingsPage from './components/SettingsPage'
import { BrowserRouter, Route } from 'react-router-dom';

const theme = {
	global: {
		font: {
			family: 'Montserrat',
			size: '14px',
			height: '20px'
		}
	}
};

class App extends Component {
	render() {
		return (
      <BrowserRouter>
        <Grommet theme={theme} full>
              <Box fill>
								<Route exact path="/" component={AppMain} />
                <Route exact path="/login" component={Login} />
								<Route exact path="/overview" component={OverviewPage} /> 
								<Route exact path="/history" component={HistoryPage} />
								<Route exact path="/settings" component={SettingsPage} />
              </Box>
        </Grommet>
      </BrowserRouter>
		);
	}
}

export default App;
