import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Home from '../Home';
import Tags from '../Tags';
import Archive from '../Archive';
import Settings from '../Settings';
import { Layout } from 'antd';

const { Footer } = Layout;

export class AppMain extends Component {
	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sidebar {...this.props}/>
				<Layout>
					<Route exact path="/" component={Home} />
					<Route exact path="/tags" component={Tags} />
					<Route exact path="/archive" component={Archive} />
					<Route exact path="/settings" component={Settings} />
					<Footer style={{ textAlign: 'center' }}>Novu ©2019 Created by James Baldwin</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(AppMain);
