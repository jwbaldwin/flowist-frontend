import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../../../actions/userActions';
import { Auth } from "aws-amplify";
import '../UserAuth.css';

export class SignUpFormNormal extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmationSubmit = async (e) => {
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
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    validateConfirmationForm = (rule, value, callback) => {
        console.log(value === undefined);
        return (value === undefined);
    }

    renderSignUp() {
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
                    })(<Input size='large' />)}
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
                    })(<Input size='large' type="password" />)}
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
                    })(<Input size='large' type="password" onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked'
                    })(
                        <Checkbox>
                            I have read the <a href="/">agreement</a>
                        </Checkbox>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button size='large' type="primary" className="green-btn" block htmlType="submit">
                        Register
					</Button>
                </Form.Item>
            </Form>
        );
    }

    renderSignUpConfirmation() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 }
        };

        return (
            <Form onSubmit={this.handleConfirmationSubmit}>
                <Form.Item {...formItemLayout} label="Confirmation Code">
                    {getFieldDecorator('confirmation-code', {
                        rules: [
                            {
                                required: true,
                                min: 1,
                                message: 'Input the confirmation code found in the email.'
                            }
                        ]
                    })(<Input size='large'
                            onChange={this.handleChange}
                            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }}
                            /> }/>)}
                </Form.Item>
                <Form.Item {...formItemLayout}>
                    <Button
                        size='large'
                        type="primary"
                        className="green-btn"
                        block
                        htmlType="submit"
                        disabled={this.hasErrors}
                        loading={this.props.user.isLoading}>
                        Confirm
                    </Button>
                </Form.Item>
            </Form >
        );
    }

    render() {
        return (
            <div>
                {this.props.user.data !== undefined ?
                this.renderSignUp()
                : this.renderSignUpConfirmation()}
            </div>
        );
    }
}

const SignUpForm = Form.create({ name: 'register' })(SignUpFormNormal);

SignUpForm.propTypes = {
    userActions: PropTypes.object,
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm));
