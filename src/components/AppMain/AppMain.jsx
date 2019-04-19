import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../actions/settingsActions';
import * as flowActions from '../../actions/flowActions';
import * as userActions from '../../actions/userActions';
import SidebarWrapper from '../SidebarWrapper';
import SideMenu from '../SideMenu';
import AppFooter from '../AppFooter';
import HeaderNav from '../HeaderNav';
import Home from '../Home';
import Tags from '../Tags';
import Archive from '../Archive';
import Settings from '../Settings';
import Profile from '../Profile';
import { Layout, Col, Row } from 'antd';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';


const StyledLayout = styled(Layout)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.background};
`;


export class AppMain extends Component {
	state = {
		collapsed: false,
		archivedFlows: [],
		activeFlows: [],
		pausedFlows: []
	};

	componentDidMount() {
		this.props.settingsActions.fetchSettings();
		this.props.flowActions.fetchFlows();
	}

	toggleCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {

		return (
			<Layout style={{ minHeight: '100vh' }}>
				{isMobile ? <SidebarWrapper
                    activeFlows={ this.props.flows.filter((flow) => flow.flowStatus === 'ACTIVE')}
					toggle={this.toggleCollapse}
					collapsed={this.state.collapsed}
					{...this.props}
				/> : null }
				<StyledLayout>
					<HeaderNav toggle={this.toggleCollapse} collapsed={this.state.collapsed} {...this.props} />
					<Row gutter={24} type="flex" justify="space-around">
						<Col xs={0} sm={0} md={1} lg={1} xl={1}/>
						{ !isMobile ? <Col xs={0} sm={0} md={6} lg={6} xl={6}>
										<SideMenu activeFlows={ this.props.flows.filter((flow) => flow.flowStatus === 'ACTIVE')}{...this.props} />
									</Col>  : null }
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Route exact path="/app" component={() => <Home flows={this.props.flows} />} />
							<Route exact path="/app/flows/:id" component={() => <Home flows={this.props.flows} />} />
							<Route exact path="/app/tags" component={Tags} />
							<Route exact path="/app/archive" component={() => <Archive flows={this.props.flows} />} />
							<Route exact path="/app/settings" component={Settings} />
							<Route
								exact
								path="/app/profile"
								component={() => <Profile flows={this.props.flows} user={this.props.user.user} />}
							/>
						</Col>
						<Col xs={0} sm={0} md={5} lg={5} xl={5}/>
					</Row>
					<AppFooter />
				</StyledLayout>
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
