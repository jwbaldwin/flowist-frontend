import React, { Component } from 'react';
import { Box, Heading, RoutedButton } from 'grommet';

export class AppBar extends Component {
	render() {
		const loginStyle = {
			fontWeight: 'bold'
		};

		return (
			<Box
				tag="appbar"
				direction="column"
				align="center"
				justify="between"
				background="accent-1"
				pad={{ left: 'medium', right: 'medium', vertical: 'large' }}
				elevation="medium"
				style={{ zIndex: '1' }}
			>
				<Heading level="2" margin="none">
					Novu
				</Heading>
				<RoutedButton label="login" path="/login" style={loginStyle} />
			</Box>
		);
	}
}

export default AppBar;
