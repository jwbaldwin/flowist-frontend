import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

const formNameLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 22 },
    }

const formEmailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 23 },
    }

export class UserProfileForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { getFieldDecorator, isFieldsTouched } = this.props.form;
        const user = this.props.user;

        return (
            <Form onSubmit={this.handleSubmit} style={{textAlign: 'left'}}  hideRequiredMark colon={false} labelAlign="left">
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="First Name"
                            {...formNameLayout}
                        >
                            <Input defaultValue={user.name}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Last Name"
                            {...formNameLayout}
                        >
                            <Input defaultValue={user.family_name}/>
                        </Form.Item>
                    </Col>
                </Row>
                 <Form.Item
                    label="E-mail"
                    {...formEmailLayout}
                >
                    <Input defaultValue={user.email}/>
                </Form.Item>
                <Button type="primary" htmlType="submit" disabled={!isFieldsTouched} >Save</Button>
            </Form>
        );
    }
}

const UserProfile = Form.create({ name: 'user_profile' })(UserProfileForm);

export default UserProfile;
