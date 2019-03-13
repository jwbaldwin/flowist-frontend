import React, { Component } from 'react';
import { Switch, Icon } from 'antd';
import './ThemeSwitch.css';

export class Settings extends Component {
	render() {
		return (
			 <Switch
						id="sider-theme-switch"
						checkedChildren={<Icon type="rocket" />}
						unCheckedChildren={<Icon type="bulb" />}
						checked={this.props.theme === 'dark'}
						onChange={this.props.updateTheme}
					/>
		);
	}
}

export default Settings;
