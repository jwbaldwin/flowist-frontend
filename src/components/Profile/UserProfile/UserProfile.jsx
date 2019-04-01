import React, { Component } from 'react';
import { Layout, Icon, Form, Input, Button } from 'antd';

export class UserProfileForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { getFieldDecorator, isFieldsTouched } = this.props.form;
        const user = this.props.user;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="First Name"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="Last Name"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" disabled={!isFieldsTouched} >Submit</Button>
            </Form>
        );
    }
}

const UserProfile = Form.create({ name: 'user_profile' })(UserProfileForm);

export default UserProfile;
