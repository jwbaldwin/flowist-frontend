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
import AppFloatingButtons from '../AppFloatingButtons';
import TitleContainer from '../TitleContainer';
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
	min-height: 100%;
	position: relative;
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
					<HeaderNav toggle={this.toggleCollapse} collapsed={this.state.collapsed} {...this.props} 
						theme={this.props.settings.theme}/>
                    <Row>
                        <TitleContainer/>
                    </Row>
					<Row type="flex" justify="space-around" style={{paddingBottom: 90}}>
						<Col span={1}/>
						{ !isMobile ? 
                        <Col xs={0} sm={0} md={4} lg={4} xl={4}>
							<SideMenu activeFlows={ this.props.flows.filter((flow) => flow.flowStatus === 'ACTIVE')}{...this.props} />
						</Col>  : null }
						<Col xs={0} sm={0} md={1} lg={1} xl={1}/>
						<Col xs={22} sm={22} md={10} lg={10} xl={10}>
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
						<Col xs={0} sm={0} md={3} lg={3} xl={3}/>
						<Col xs={0} sm={0} md={4} lg={4} xl={4}/>
						<Col span={1}/>
					</Row>
					<AppFloatingButtons />
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
