import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Skeleton, Card, Icon } from 'antd';
import './FlowItem.css';
import FlowTagsFooter from './FlowTagsFooter';

const { Meta } = Card;

const iconMap = {
	coding: 'laptop',
	researching: 'search',
	debugging: 'alert'
};

class FlowItem extends Component {
	render() {
		const { flow } = this.props;
		const created= new Date(flow.created);
		return (
			<Card
				style={{ width: 500, marginTop: 16 }}
				actions={[ <Icon type="ellipsis" />, <Icon type="edit" />, <Icon type="check" /> ]}
				extra={
					created.toLocaleTimeString().toLocaleLowerCase() +
					' - ' +
					created.toDateString().toLocaleLowerCase()
				}
				title={'You were: ' + flow.activity}
			>
				<Skeleton loading={this.props.isLoading} avatar title paragraph={{ rows: 4 }} active>
					<Meta
						avatar={<Icon id="flow-icon" type={iconMap[flow.activity]} />}
						title={flow.title}
						description={flow.content}
					/>
					<FlowTagsFooter tags={flow.tags} />
				</Skeleton>
			</Card>
		);
	}
}

FlowItem.propTypes = {
	flowActions: PropTypes.object,
	flow: PropTypes.object,
	isLoading: PropTypes.bool
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

export default connect(mapStateToProps, mapDispatchToProps)(FlowItem);
