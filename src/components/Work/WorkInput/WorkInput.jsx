import React, { Component } from 'react';
import { Input, Icon, Select, Badge, Button } from 'antd';
import styled, { withTheme } from 'styled-components';

const Option = Select.Option;
const InputGroup = Input.Group;

export class WorkInput extends Component {
    state = {
        work: {
            type: 'update',
            data: ''
        }
    }

    updateData = (event) => {
        this.setState({
            work: {
                type: this.state.work.type,
                data: event.target.value
            }
        });
    }

    updateType = (event) => {
        this.setState({
            work: {
                type: event,
                data: this.state.work.data
            }
        });
    }

    render() {
        const selectBefore = (
            <Select defaultValue="update" style={{ minWidth: 110 }} onChange={this.updateType}>
                <Option value="update"><Badge status="processing" text="Update"/></Option>
                <Option value="info"><Badge status="default" text="Info"/></Option>
                <Option value="complete"><Badge status="success" text="Completed"/></Option>
                <Option value="error"><Badge status="error" text="Error"/></Option>
                <Option value="warning"><Badge status="warning" text="Warning"/></Option>
            </Select>
        );

        return (
                <Input
                    size="large"
                    addonBefore={selectBefore}
                    placeholder="Log your work"
                    value={this.state.work.data}
                    onChange={this.updateData}
                    onPressEnter={() => this.props.log(this.state.work)} />
        );
    }
}

export default withTheme(WorkInput);
