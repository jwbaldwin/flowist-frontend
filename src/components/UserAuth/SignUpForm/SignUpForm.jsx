import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Icon, Checkbox, Button, notification } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../../../actions/userActions';
import { Auth } from "aws-amplify";
import '../UserAuth.scss';

import { PasswordInput } from 'antd-password-input-strength';

export class SignUpFormNormal extends Component {
    state = {
        isLoading: false,
        email: '',
        password: '',
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.setState({isLoading: true});
                try {
                    const user = await Auth.signUp({
                        username: values.email,
                        password: values.password,
                        attributes: {
                            name: values.name,
                            family_name: values.lastname
                        }});
                    this.props.userActions.updateUser({...this.props.user, data: user});
                    this.setState({email: values.email, password: values.password, isLoading: false })
                    notification.success({
                        "message": "Check your email!",
                        "description": "We just sent a verification code to you!"
                    });
                } catch (e) {
                    this.props.showSignUpError(e.message);
                     this.setState({isLoading: false});
                }
            }
        });
    };

    handleConfirmationSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                try {
                    await Auth.confirmSignUp(this.state.email, values.confirmationCode);
                    await Auth.signIn(this.state.email, this.state.password);

                    this.props.userActions.updateUser({...this.props.user, isAuthenticated: true});
                    this.setState({isLoading: false});
                    this.props.history.push("/app");
                  } catch (e) {
                    this.setState({isLoading: false});
                    this.props.showSignUpError(e.message);
                  }
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
                <Form.Item {...formItemLayout} label="First Name">
                    {getFieldDecorator('name', {
                        rules: [{
                        required: true,
                        message: 'Please input your first name',
                        }],
                    })(
                        <Input size='large'/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Last Name">
                    {getFieldDecorator('lastname', {
                        rules: [{
                        required: true,
                        message: 'Please input your last name',
                        }],
                    })(
                        <Input size='large'/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not a valid e-mail'
                            },
                            {
                                required: true,
                                message: 'Please input your e-mail'
                            }
                        ]
                    })(<Input size='large'/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Password">
                    {getFieldDecorator('password', {
						rules: [{
							required: true,
							message: "Please input your password"
                        },
                        {
                            min: 8,
                            message: "Password must be more than 8 characters in length"
                        }
                    ]
                })(
                        <PasswordInput inputProps={{ size:"large" }}/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Confirm Password">
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password'
                            },
                            {
                                validator: this.compareToFirstPassword
                            }
                        ]
                    })(<Input.Password size='large' type="password" onBlur={this.handleConfirmBlur}/>)}
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
                    <Button
                        size='large'
                        loading={this.state.isLoading}
                        type="primary"
                        className="green-btn"
                        block
                        htmlType="submit">
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
                    {getFieldDecorator('confirmationCode', {
                        rules: [
                            {
                                required: true,
                                min: 4,
                                message: 'Input the confirmation code found in your email.'
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
                        disabled={!this.props.form.isFieldTouched('confirmationCode')}
                        loading={this.state.isLoading}>
                        Confirm
                    </Button>
                </Form.Item>
            </Form >
        );
    }

    render() {
        return (
            <div>
                {this.props.user.data === undefined ?
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
