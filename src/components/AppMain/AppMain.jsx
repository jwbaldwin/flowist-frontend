import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../actions/settingsActions';
import * as userActions from '../../actions/userActions';
import Sidebar from '../Sidebar';
import AppFooter from '../AppFooter';
import HeaderNav from '../HeaderNav';
import Home from '../Home';
import Tags from '../Tags';
import Archive from '../Archive';
import Settings from '../Settings';
import Profile from '../Profile';
import { Layout } from 'antd';

export class AppMain extends Component {
	state = {
		collapsed: false
	};

	componentWillMount() {
		this.props.settingsActions.fetchSettings();
	}

	toggleCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sidebar toggle={this.toggleCollapse} collapsed={this.state.collapsed} {...this.props} />
				<Layout>
					<HeaderNav toggle={this.toggleCollapse} collapsed={this.state.collapsed} {...this.props}/>
					<Route exact path="/" component={Home} />
					<Route exact path="/tags" component={Tags} />
					<Route exact path="/archive" component={Archive} />
					<Route exact path="/settings" component={Settings} />
                    <Route exact path="/profile" component={Profile} />
					<AppFooter />
				</Layout>
			</Layout>
		);
	}
}

AppMain.propTypes = {
	settingsActions: PropTypes.object,
    userActions: PropTypes.object,
	settings: PropTypes.object,
    user: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		settings: state.settings,
        user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		settingsActions: bindActionCreators(settingsActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppMain));
