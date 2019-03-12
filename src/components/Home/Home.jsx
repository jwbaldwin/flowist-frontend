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
		this.props.flowActions.fetchFlow();
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
                : (Object.getOwnPropertyNames(this.props.flow).length > 0 ? <FlowHome /> : <EmptyHome />)}
			</Content>
		);
	}
}

Home.propTypes = {
	flowActions: PropTypes.object,
	flow: PropTypes.object
};

function mapStateToProps(state) {
	return {
		flow: state.flow.data,
		isLoading: state.flow.isLoading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		flowActions: bindActionCreators(flowActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
