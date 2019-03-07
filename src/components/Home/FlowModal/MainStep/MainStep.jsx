import React, { Component } from 'react';
import { Input, Icon, Tooltip } from 'antd';
import './MainStep.css';

const { TextArea } = Input;

const tooltipHelpText = "Enter any extra information about what you're working on! P.S. we support markdown!";

export class MainStep extends Component {

	render() {
		return (
            <div>
                <Tooltip title={tooltipHelpText}>
                    <Icon type='info-circle' style={{ float: 'right', margin: 5, color: 'rgba(0,0,0,.45)' }}/>
                </Tooltip>
                <label htmlFor='content'>Notes</label>
                <TextArea
                    id='content'
                    placeholder="...while loop won't stop - should try Ctrl + C"
                    value={this.props.flowData.content}
                    autosize={{ minRows: 7 }}
                    onChange={this.props.handleChange('content')} />
            </div>
		);
	}
}

export default MainStep;
