import React, { Component } from 'react';
import { Box, Grommet } from 'grommet';
import AppMain from './components/AppMain';
import Login from './components/Login'
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
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={AppMain} />
              </Box>
        </Grommet>
      </BrowserRouter>
		);
	}
}

export default App;
