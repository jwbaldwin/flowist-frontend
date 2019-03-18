import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Layout, Spin } from 'antd';
import EmptyHome from './EmptyHome';
import FlowHome from '../FlowHome';
import './Home.css';

const { Content } = Layout;

class Home extends Component {
	componentWillMount() {
		this.props.flowActions.fetchFlows();
		document.addEventListener('keydown', this.handleKeyPress.bind(this));
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress.bind(this));
	}

	handleKeyPress = () => {};

	render() {
		return (
			<Content
				className="centered home"
				style={{ padding: 24 }}
				onKeyPress={() => this.handleKeyPress}
			>
				{this.props.isLoading ?
                <Spin size="large" />
                : (this.props.flows.length > 0 ? <FlowHome flows={this.props.flows} /> : <EmptyHome />)}
			</Content>
		);
	}
}

Home.propTypes = {
	flowActions: PropTypes.object,
	flows: PropTypes.array
};

function mapStateToProps(state) {
	return {
		flows: state.flow.data,
		isLoading: state.flow.isLoading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		flowActions: bindActionCreators(flowActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
