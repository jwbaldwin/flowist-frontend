import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Checkbox, Button } from 'antd';
import '../UserAuth.css';

export class SignUpFormNormal extends Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: []
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('The passwords must be the same.');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields([ 'confirm' ], { force: true });
		}
		callback();
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: { span: 24 },
			wrapperCol: { span: 24 }
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 24,
					offset: 0
				}
			}
		};

		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item {...formItemLayout} label="E-mail">
					{getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								message: 'The input is not valid E-mail!'
							},
							{
								required: true,
								message: 'Please input your E-mail!'
							}
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item {...formItemLayout} label="Password">
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Please input your password!'
							},
							{
								validator: this.validateToNextPassword
							}
						]
					})(<Input type="password" />)}
				</Form.Item>
				<Form.Item {...formItemLayout} label="Confirm Password">
					{getFieldDecorator('confirm', {
						rules: [
							{
								required: true,
								message: 'Please confirm your password!'
							},
							{
								validator: this.compareToFirstPassword
							}
						]
					})(<Input type="password" onBlur={this.handleConfirmBlur} />)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					{getFieldDecorator('agreement', {
						valuePropName: 'checked'
					})(
						<Checkbox>
							I have read the <a href="">agreement</a>
						</Checkbox>
					)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" className="green-btn" block htmlType="submit">
						Register
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const SignUpForm = Form.create({ name: 'register' })(SignUpFormNormal);

export default SignUpForm;
