import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import EmptyHome from './EmptyHome';
import FlowHome from '../FlowHome';
import './Home.css';

const { Content } = Layout;

class Home extends Component {
	componentWillMount() {
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


function mapStateToProps(state) {
	return {
		isLoading: state.flow.isLoading
	};
}

export default connect(mapStateToProps, null)(Home);
