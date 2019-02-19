import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Layout } from 'antd';
import EmptyHome from './EmptyHome';
import FlowItem from '../FlowItem';


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
				className="centered"
				style={{ padding: 24, minHeight: '100vh' }}
				onKeyPress={() => this.handleKeyPress}
			>
				{this.props.flow.length > 0 ? <FlowItem /> : <EmptyHome />}
			</Content>
		);
	}
}

Home.propTypes = {
	flowActions: PropTypes.object,
	flow: PropTypes.array
};

function mapStateToProps(state) {
	return {
		flow: state.flow
	};
}

function mapDispatchToProps(dispatch) {
	return {
		flowActions: bindActionCreators(flowActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
