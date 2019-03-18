import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Layout, Spin } from 'antd';
import ArchiveContent from './ArchiveContent';
import ArchiveEmpty from './ArchiveEmpty';

const { Content } = Layout;

export class Archive extends Component {
	render() {
		return (
		    <Content
            className="centered"
            style={{ padding: 24 }}
            >
                {this.props.isLoading ?
                    <Spin size="large" />
                    : (this.props.flows.length > 0 ? <ArchiveContent flows={this.props.flows} /> : <ArchiveEmpty />)}
            </Content>
		);
	}
}

Archive.propTypes = {
	flowActions: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		isLoading: state.flow.isLoading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		flowActions: bindActionCreators(flowActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
