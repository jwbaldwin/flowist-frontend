import React, { Component } from 'react';
import { Box, Heading, RoutedButton } from 'grommet';
import { Archive, Home, Overview, Performance  } from 'grommet-icons';
import './Appbar.css'

export class Appbar extends Component {
	constructor(props) {
		super(props)

		this.state = {

		}
	}

	render() {

		return (
			<Box
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
					<RoutedButton className='app-bar-btn'
					icon={<Home className='icon' color='plain'/>} label="Home" path='/' plain
					  alignSelf="start"/>
					<RoutedButton className='app-bar-btn' 
					icon={<Overview className='icon' color='plain' />} label="Overview" path='/overview' plain
					  alignSelf="start"/>
					<RoutedButton className='app-bar-btn' 
					icon={<Archive className='icon' color='plain' />} label="Archive" path='/history' plain
					  alignSelf="start"/>
					<RoutedButton className='app-bar-btn' 
					icon={<Performance className='icon' color='plain' />} label="Performance" path='/settings' plain
					  alignSelf="start"/>
				</Box>
				
				<RoutedButton
					className='login-btn'
					justify="end" 
					label="login"
					path="/login" />
			</Box>
		);
	}
}

export default Appbar;
