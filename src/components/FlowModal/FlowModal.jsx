import React, { Component } from 'react';
import { Button, Modal, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import FinalStep from './FinalStep';
import MainStep from './MainStep';
import InfoStep from './InfoStep';
import './FlowModal.scss';

export class FlowModal extends Component {
	state = {
		visible: false,
		confirmLoading: false,
		flow: {
			activity: '',
			title: '',
			content: '',
			tags: [],
		}
	};


	static getDerivedStateFromProps(nextProps, prevState){
		try {
			if(nextProps.flow.title !== prevState.flow.title){
				return {
					flow: nextProps.flow
				}
			}
			else return null;
		} catch  {
			return null;
		}
	 }

	componentDidUpdate(prevProps) {
		if (this.props.visible !== prevProps.visible) {
			this.setState({ visible: !this.state.visible });
		}
	}

	handleOk = () => {
		this.setState({
			confirmLoading: true
		});
        this.props.type === "create" ?
            this.props.flowActions.addFlow(this.state.flow)
            : this.props.flowActions.updateFlow(this.state.flow);
		this.setState({ visible: false, confirmLoading: false });
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
		try {
			this.props.addKeybindListener();			
		} catch (e) {}
	};

	handleChange = (input) => (event) => {
        if (event === undefined || event.target === undefined) {
            this.setState({
			    flow: Object.assign({}, this.state.flow, { [input]: event }),
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
		if (event.key === 'Enter') {
			this.handleOk();
		}
	};

	render() {
		return (
			<div onKeyPress={this.handleKeyPress}>
				<Modal
					title={<span><Icon className='primary-icon' type='coffee' style={{fontSize:24}}/> Record your flow!</span> }
					visible={this.state.visible}
					onOk={this.handleOk}
					confirmLoading={this.state.confirmLoading}
					onCancel={this.handleCancel}
					footer={[
                            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                            <Button
									key="submit"
									style={{ textAlign: 'right' }}
									type="primary"
									loading={this.state.confirmLoading}
									onClick={() => this.handleOk()}
								>
                                    <Icon type="rest" />
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