import React, { Component } from 'react';
import { Switch, Icon } from 'antd';
import './ThemeSwitch.scss';

export class Settings extends Component {
    render() {
        return (
            <Switch
                id="sider-theme-switch"
                checkedChildren={<i class="fas fa-moon"></i>}
                unCheckedChildren={<i class="fas fa-sun"></i>}
                checked={this.props.theme === 'dark'}
                onChange={this.props.updateTheme}
            />
        );
    }
}

export default Settings;
