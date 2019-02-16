import React, { Component } from 'react';
import { Steps, Button, Icon, Modal, message } from 'antd';
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
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			confirmLoading: false,
			current: 0,
            activity: '',
			title: '',             
			content: '',
			tags: []
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
            console.log(this.state)

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

	handleChange = (input) => (event) => {
        this.setState({ [input]: event.target.value });
    };

    handleTagsChange = (tags) => {
        this.setState({ tags: tags });
	};

	next() {
		this.setState({ current: this.state.current + 1 });
	}

	prev() {
		this.setState({ current: this.state.current - 1 });
	}

	render() {
		const { current } = this.state;
		const { activity, title, content, extra } = this.state;
		const flowData = { activity, title, content, extra };

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
						<div className="steps-content">
							{current === 0 && <InfoStep handleChange={this.handleChange} flowData={flowData} />}
							{current === 1 && <MainStep handleChange={this.handleChange} flowData={flowData} />}
                            {current === 2 && <FinalStep handleChange={this.handleChange} 
                                                         handleTagsChange={this.handleTagsChange} 
                                                         flowData={flowData} />}
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default FlowModal;
