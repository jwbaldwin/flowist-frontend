import React, { Component } from 'react';
import { Icon, Input, Select } from 'antd';
import './InfoStep.scss';

const Option = Select.Option;

export class InfoStep extends Component {

	render() {
		return (
			<div>
				<div>
					<label htmlFor="activity-group"><Icon type='desktop'/> What where you up to?</label>
                    <Select
                        id="activity-group"
                        showSearch
                        style={{ width: '100%'}}
                        value={this.props.flowData.activity === '' ?
                            <span style={{color: '#bfbfbf'}}>Drinking coffee...</span>
                            : this.props.flowData.activity}
                        optionFilterProp="children"
                        allowClear={true}
                        onChange={this.props.handleChange('activity')}
                        filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                    >
                        <Option value="coding"><Icon type="laptop" /> Programming</Option>
                        <Option value="researching"><Icon type="search" /> Researching</Option>
                        <Option value="debugging"><Icon type="alert" /> Debugging</Option>
                        <Option value="planning"><Icon type="schedule" /> Planning</Option>
                    </Select>
				</div>
				<div>
					<label htmlFor="title"><Icon type="notification" /> Brief description</label>
					<Input
						id="title"
						placeholder="Need to stop infinite while loop..."
						value={this.props.flowData.title}
						onChange={this.props.handleChange('title')}
						onPressEnter={this.props.handleChange('title')} />
				</div>
			</div>
		);
	}
}

export default InfoStep;
