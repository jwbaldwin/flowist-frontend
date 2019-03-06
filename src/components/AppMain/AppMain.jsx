import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';
import HeaderNav from '../HeaderNav';
import Home from '../Home';
import Tags from '../Tags';
import Archive from '../Archive';
import Settings from '../Settings';
import { Layout } from 'antd';

const { Footer } = Layout;

export class AppMain extends Component {
    state = {
        collapsed: false,
    };

    toggleCollapse = () => {
        this.setState({
        collapsed: !this.state.collapsed,
        });
    }

	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sidebar toggle={this.toggleCollapse} collapsed={this.state.collapsed}/>
				<Layout>
                    <HeaderNav toggle={this.toggleCollapse} collapsed={this.state.collapsed}/>
					<Route exact path="/" component={Home} />
					<Route exact path="/tags" component={Tags} />
					<Route exact path="/archive" component={Archive} />
					<Route exact path="/settings" component={Settings} />
					<Footer style={{ textAlign: 'center' }}>Flowist ©2019 Created by James Baldwin</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(AppMain);
