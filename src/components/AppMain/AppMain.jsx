import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../actions/settingsActions';
import * as flowActions from '../../actions/flowActions';
import * as userActions from '../../actions/userActions';
import SidebarWrapper from '../SidebarWrapper';
import AppFooter from '../AppFooter';
import HeaderNav from '../HeaderNav';
import Home from '../Home';
import Tags from '../Tags';
import Archive from '../Archive';
import Settings from '../Settings';
import Profile from '../Profile';
import { Layout } from 'antd';
import { isMobile } from 'react-device-detect';

export class AppMain extends Component {
	state = {
		collapsed: false,
		archivedFlows: [],
		activeFlows: [],
		pausedFlows: []
	};

	componentDidMount() {
		console.log('object')
		this.props.settingsActions.fetchSettings();
		this.props.flowActions.fetchFlows();
	}
	
	// componentDidUpdate(prevProps){
	// 	if(prevProps.flows !== this.props.flows){
	// 		this.setState({          
	// 			flows: this.props.flows,
	// 			activeFlows: this.props.flows.filter((flow) => flow.flowStatus === 'ACTIVE'),
	// 			archivedFlows: this.props.flows.filter((flow) => flow.flowStatus === 'COMPLETED'),
	// 			pausedFlows: this.props.flows.filter((flow) => flow.flowStatus === 'PAUSED')
	// 		});
	// 	}
	// }

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log(nextProps)
		if (nextProps.flows !== prevState.flows) {
			return {
				flows: nextProps.flows,
				activeFlows: nextProps.flows.filter((flow) => flow.flowStatus === 'ACTIVE'),
				archivedFlows: nextProps.flows.filter((flow) => flow.flowStatus === 'COMPLETED'),
				pausedFlows: nextProps.flows.filter((flow) => flow.flowStatus === 'PAUSED')
			};
		} else return null;
	}

	toggleCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<SidebarWrapper
					toggle={this.toggleCollapse}
					collapsed={this.state.collapsed}
					isMobile={isMobile}
					{...this.props}
				/>
				<Layout>
					<HeaderNav toggle={this.toggleCollapse} collapsed={this.state.collapsed} {...this.props} />
					<Route exact path="/app" component={() => <Home flows={this.state.activeFlows} />} />
					<Route exact path="/app/tags" component={Tags} />
					<Route exact path="/app/archive" component={() => <Archive flows={this.state.archivedFlows} />} />
					<Route exact path="/app/settings" component={Settings} />
					<Route
						exact
						path="/app/profile"
						component={() => <Profile flows={this.props.flows} user={this.props.user.user} />}
					/>
					<AppFooter />
				</Layout>
			</Layout>
		);
	}
}

AppMain.propTypes = {
	settingsActions: PropTypes.object,
	userActions: PropTypes.object,
	flows: PropTypes.array,
	settings: PropTypes.object,
	user: PropTypes.object
};

function mapStateToProps(state) {
	return {
		flows: state.flow.data,
		settings: state.settings,
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		flowActions: bindActionCreators(flowActions, dispatch),
		settingsActions: bindActionCreators(settingsActions, dispatch),
		userActions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppMain));
