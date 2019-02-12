import React, { Component } from 'react';
import { Modal } from 'antd';

export class FlowModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ModalText: 'Content of the modal',
			visible: false,
			confirmLoading: false
		};
	}

	componentDidUpdate(prevProps) {
		if(this.props.visible !== prevProps.visible){
			this.setState({visible: !this.state.visible});
		}
	}

	handleOk = () => {
		this.setState({
			ModalText: 'The modal will be closed after two seconds',
			confirmLoading: true
		});
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false
			});
		}, 2000);
	};

	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
			visible: false
		});
	};

	render() {
		return (
			<div>
				<Modal
					title="Title"
					visible={this.state.visible}
					onOk={this.handleOk}
					confirmLoading={this.state.confirmLoading}
					onCancel={this.handleCancel}
				>
					<p>{this.state.ModalText}</p>
				</Modal>
			</div>
		);
	}
}

export default FlowModal;
