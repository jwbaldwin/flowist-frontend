import React, { Component } from 'react';
import { Box, Heading, RoutedButton, Text } from 'grommet';
import { Archive, Home, Overview, Performance } from 'grommet-icons';

export class AppBar extends Component {
	render() {
		const loginStyle = {
			fontWeight: 'bold'
		};

		const linkStyle = {
			fontWeight: 'bold',
			display: 'inline-flex',
    		verticalAlign: 'middle'
		};

		const iconStyle = {
			paddingLeft: '10%',
			paddingRight: '10%'
		}

		return (
			<Box
				tag="appbar"
				align="center"
				background="accent-1"
				basis="small"
				direction="column"
				justify="between"
				pad={{ left: 'medium', right: 'medium', vertical: 'large' }}
				elevation="medium"
				style={{ zIndex: '1' }}
			>
				<Heading level="1" margin="medium">
					Novu
				</Heading>
				<Box
					fill
					alignContent="center"
					gap="medium"
					justify="start"
					pad={{ top: 'large' }}
				>
					<Text color='black' textAlign='start' style={linkStyle}>
						<Home color='plain' style={iconStyle}/>
						Home
					</Text>
					<Text color='black' textAlign='start' style={linkStyle}>
						<Overview color='plain' style={iconStyle}/>
						Overview
					</Text>
					<Text color='black' textAlign='start' style={linkStyle}>
						<Archive color='plain' style={iconStyle}/>
						Archive
					</Text>
					<Text color='black' textAlign='start' style={linkStyle}>
						<Performance color='plain' style={iconStyle}/>
						Settings
					</Text>
				</Box>
				
				<RoutedButton
					justify="end" 
					label="login"
					path="/login" 
					style={loginStyle} />
			</Box>
		);
	}
}

export default AppBar;
