import React, { Component } from 'react';
import { Steps, Button, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../../actions/flowActions';
import FinalStep from './FinalStep';
import MainStep from './MainStep';
import InfoStep from './InfoStep';
import './FlowModal.css';

const Step = Steps.Step;

const steps = [
	{
		title: 'Info',
		icon: <Icon type="form" />
	},
	{
		title: 'Dump',
		icon: <Icon type="code" />
	},
	{
		title: 'Go!',
		icon: <Icon type="smile" />
	}
];

export class FlowModal extends Component {
	state = {
		visible: false,
		confirmLoading: false,
		flow: {
			activity: '',
			title: '',
			content: '',
			tags: []
		}
	};

	componentDidUpdate(prevProps) {
		if (this.props.visible !== prevProps.visible) {
			this.setState({ visible: !this.state.visible });
		}
	}

	saveFlowMessage = () => {
		message.loading('Saving your flow..', 1.0).then(() => message.success('Your flow is saved!', 1.5));
	};

	handleOk = () => {
		this.setState({
			confirmLoading: true
		});
		this.saveFlowMessage();
		this.props.flowActions.addFlow(this.state.flow);
		this.setState({ visible: false, confirmLoading: false });
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	handleChange = (input) => (event) => {
        if (event === undefined || event.target === undefined) {
            this.setState({
			    flow: Object.assign({}, this.state.flow, { [input]: event })
		    });
        } else {
            this.setState({
			    flow: Object.assign({}, this.state.flow, { [input]: event.target.value })
		    });
        }

	};

	handleContentChange = (content) => {
		this.setState({
			flow: Object.assign({}, this.state.flow, { content: content })
		});
	};

	handleTagsChange = (tags) => {
		this.setState({
			flow: Object.assign({}, this.state.flow, { tags: tags })
		});
	};

	handleKeyPress = (event) => {
		if (event.key === 'Enter' && this.state.current === 0) {
			this.next();
		}
	};

	render() {
		return (
			<div onKeyPress={this.handleKeyPress}>
				<Modal
					title="Record your flow!"
					visible={this.state.visible}
					onOk={this.handleOk}
					confirmLoading={this.state.confirmLoading}
					onCancel={this.handleCancel}
					footer={[
                            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                            <Button
									style={{ textAlign: 'right' }}
									type="primary"
									loading={this.state.confirmLoading}
									onClick={() => this.handleOk()}
								>
									Save
								</Button>
                    ]}
				>
					<div>
						<div className="steps-content">
							<InfoStep handleChange={this.handleChange} flowData={this.state.flow} />
							<MainStep handleContentChange={this.handleContentChange} flowData={this.state.flow} />
							<FinalStep
									handleChange={this.handleChange}
									handleTagsChange={this.handleTagsChange}
									flowData={this.state.flow}
								/>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

FlowModal.propTypes = {
	flowActions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
	return {
		flowActions: bindActionCreators(flowActions, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(FlowModal);
