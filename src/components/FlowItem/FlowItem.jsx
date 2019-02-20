import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Skeleton, Switch, Card, Icon } from 'antd';
import './FlowItem.css';
import FlowTagsFooter from './FlowTagsFooter';

const { Meta } = Card;

const iconMap = {
	coding: 'laptop',
	researching: 'search',
	debugging: 'alert'
};

class FlowItem extends Component {
	state = {
		loading: false
	};

	onChange = (checked) => {
		this.setState({ loading: !checked });
	};

	render() {
		const { loading } = this.state;
		return (
			<div>
				<Switch checked={!loading} onChange={this.onChange} />
				{this.props.flow.map((flow, index) => {
					return (
						<Card
							key={index}
							style={{ width: 500, marginTop: 16 }}
							actions={[ <Icon type="setting" />, <Icon type="edit" />, <Icon type="check" /> ]}
							extra={flow.timestamp}
							title={flow.title}
						>
							<Skeleton loading={loading} avatar active>
								<Meta
									avatar={<Icon id='flow-icon' type={iconMap[flow.activity]} />}
									description={flow.content}
								/>
								<FlowTagsFooter tags={flow.tags} />
							</Skeleton>
						</Card>
					);
				})}
			</div>
		);
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
