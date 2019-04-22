import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import EmptyHome from './EmptyHome';
import FlowHome from '../FlowHome';
import './Home.scss';

const { Content } = Layout;

class Home extends Component {
    componentDidMount() {
        document.title = this.props.title + " |  Flowist";
    }

	render() {
		const activeFlows =  this.props.flows.filter((flow) => flow.flowStatus === 'ACTIVE')

		return (
			<Content
				className="home"
				onKeyPress={() => this.handleKeyPress}
			>
				{this.props.isLoading ?
                <Spin size="large" />
                : (activeFlows.length > 0 ? <FlowHome flows={activeFlows} /> : <EmptyHome />)}
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
