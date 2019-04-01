import React, { Component } from 'react';
import { Switch, Icon } from 'antd';
import './ThemeSwitch.scss';

export class Settings extends Component {
	render() {
		return (
			 <Switch
						id="sider-theme-switch"
						checkedChildren={<Icon type="bulb" />}
						unCheckedChildren={<Icon type="rocket" />}
						checked={this.props.theme === 'light'}
						onChange={this.props.updateTheme}
					/>
		);
	}
}

export default Settings;
