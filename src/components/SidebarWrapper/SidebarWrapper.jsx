import React, {Component} from 'react';
import { Drawer } from 'antd';
import Sidebar from '../Sidebar';
import SideMenu from '../SideMenu';
import '../Sidebar/Sidebar.scss';

export class SidebarWrapper extends Component {
    render() {
        const { collapsed, toggle } = this.props;
        return (
            <Drawer
            visible={!collapsed}
            placement="left"
            onClose={toggle}
            style={{
                padding: 0,
                height: '100vh',
            }}
            >
                <Sidebar toggle={toggle} collapsed={collapsed} {...this.props} />
            </Drawer>
        )};
}

export default SidebarWrapper;