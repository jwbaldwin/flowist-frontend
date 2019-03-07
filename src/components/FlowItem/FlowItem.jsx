import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Skeleton, Card, Icon, Typography } from 'antd';
import './FlowItem.css';
import FlowTagsFooter from './FlowTagsFooter';

const { Text } = Typography;

const iconMap = {
	coding: 'laptop',
	researching: 'search',
	debugging: 'alert'
};

const contentStyle = {
  width: '100%',
  textAlign: 'left',
};

const tagsFooterStyle = {
  width: '80%',
  textAlign: 'left',
};

const timestampStyle = {
  width: '20%',
  textAlign: 'right',
  justify: 'bottom',
};

class FlowItem extends Component {
	render() {
		const { flow } = this.props;
		const created= new Date(flow.created);

		return (
			<Card
				actions={[ <Icon type="ellipsis" />, <Icon type="edit" />, <Icon type="check" /> ]}
				extra={flow.flowStatus}
				title={flow.title}
			>
				<Skeleton loading={this.props.isLoading} avatar title paragraph={{ rows: 4 }} active>
					<Card.Grid style={contentStyle} className="flow-card-content">
                        <Icon id="flow-activity-icon" type={iconMap[flow.activity]} /><Text code>{flow.content}</Text>
                    </Card.Grid>
                    <Card.Grid style={tagsFooterStyle} className="flow-card-tags">
                        <FlowTagsFooter tags={flow.tags} />
                    </Card.Grid>
                    <Card.Grid style={timestampStyle} className="flow-card-timestamp">
                        { created.toDateString().toLocaleLowerCase() }
                    </Card.Grid>
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
