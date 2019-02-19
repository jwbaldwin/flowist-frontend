import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Skeleton, Switch, Card, Icon, Layout } from 'antd';
import './FlowItem.css';

const { Meta } = Card;

const iconMap = {
	coding: 'laptop',
	research: 'search',
	debugging: 'alert'
};

class FlowItem extends Component {
	// state = {
	// 	loading: true
	// };

	// onChange = (checked) => {
	// 	this.setState({ loading: !checked });
	// };

	render() {
		// const { loading } = this.state;
		const flowCards = this.props.flow.map((flow, index) =>
			<Card
				key={index}
				style={{ width: 500, marginTop: 16 }}
				actions={[ <Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" /> ]}>
				<Meta avatar={<Icon type={iconMap[flow.activity]} />} title={flow.title} description={flow.content} />
				{flow.tags.map((tag, index) => <span key={index} >{tag}</span>)}
			</Card>
		);

		return <div>{flowCards}</div>;
	}
}

FlowItem.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FlowItem);
