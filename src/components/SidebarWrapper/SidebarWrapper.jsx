import React, {Component} from 'react';
import { Drawer } from 'antd';
import Sidebar from '../Sidebar';
import '../Sidebar/Sidebar.scss';

export class SidebarWrapper extends Component {
    render() {
        const { isMobile, collapsed, toggle } = this.props;
        console.log(isMobile)
        return (
            isMobile ? (
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
        ) : (
            <Sidebar toggle={toggle} collapsed={collapsed} {...this.props} />
        )
    )};
}

export default SidebarWrapper;