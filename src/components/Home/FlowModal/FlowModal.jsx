import React, { Component } from 'react';
import { Steps, Button, Icon, Input, Modal, message } from 'antd';
import './FlowModal.css';

const { TextArea } = Input;
const Step = Steps.Step;

const steps = [
	{
		title: 'Info',
		content: <Input size="large" placeholder="Gimmie the deets..." />,
		icon: <Icon type="form" />
	},
	{
		title: 'Dump',
		content: <TextArea placeholder="Error dump" autosize={{ minRows: 5, maxRows: 25 }} />,
		icon: <Icon type="code" />
	},
	{
		title: 'Go!',
		content: 'Last-content',
		icon: <Icon type="smile" />
	}
];

export class FlowModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			confirmLoading: false,
			current: 0
		};
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
		setTimeout(() => {
			message.success('Your flow is saved!');

			this.setState({
				visible: false,
				confirmLoading: false
			});
		}, 2000);
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	next() {
		this.setState({ current: this.state.current + 1 });
	}

	prev() {
		this.setState({ current: this.state.current - 1 });
	}

	render() {
		const { current } = this.state;

		return (
			<div>
				<Modal
					title="Record your flow!"
					visible={this.state.visible}
					onOk={this.handleOk}
					confirmLoading={this.state.confirmLoading}
					onCancel={this.handleCancel}
					footer={
						<div className="steps-action">
							{current > 0 && (
								<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
									Previous
								</Button>
							)}
							{current < steps.length - 1 && (
								<Button style={{ textAlign: 'right' }} type="primary" onClick={() => this.next()}>
									Next
								</Button>
							)}
							{current === steps.length - 1 && (
								<Button
									style={{ textAlign: 'right' }}
									type="primary"
									loading={this.state.confirmLoading}
									onClick={() => this.handleOk()}
								>
									Done
								</Button>
							)}
						</div>
					}
				>
					<div>
						<Steps current={current}>
							{steps.map((item) => (
								<Step
									key={item.title}
									title={item.title}
									icon={item.icon}
									description={item.description}
								/>
							))}
						</Steps>
						<div className="steps-content">{steps[current].content}</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default FlowModal;
