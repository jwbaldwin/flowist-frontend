import React, { Component } from 'react';
import { Icon, Input, Tag, Tooltip } from 'antd';
import { mapStringToColor, extractTags } from '../../../common';
import './FinalStep.scss';

export class FinalStep extends Component {
	constructor(props) {
		super(props)

		this.state = {
            extractedTags: [],
			tags: [],
			inputVisible: false,
			inputValue: ''
		};
	}

	static getDerivedStateFromProps(nextProps, prevState){
		  return { extractedTags: extractTags(nextProps.flowData.activity)};
	 }

	handleClose = (removedTag) => {
		const tags = this.state.tags.filter((tag) => tag !== removedTag);
		this.setState({ tags });
	};

	showInput = () => {
		this.setState({ inputVisible: true }, () => this.input.focus());
	};

	handleInputChange = (e) => {
		this.setState({ inputValue: e.target.value });
	};

	handleInputConfirm = () => {
		const state = this.state;
		const inputValue = "#" + state.inputValue;
		let tags = state.tags;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [ ...tags, inputValue ];
		}

		this.props.handleTagsChange(tags);
		this.setState({
			tags,
			inputVisible: false,
			inputValue: ''
		});

	};

	saveInputRef = (input) => (this.input = input);

	render() {
		const { tags, inputVisible, inputValue, extractedTags } = this.state;

		return (
            <div>
                <Tooltip title="Add tags to categorize and filter your flows!">
                    <Icon type='info-circle' style={{ float: 'right', margin: 10, color: 'rgba(0,0,0,.45)' }}/>
                </Tooltip>
                <label htmlFor='tags'><Icon type='tags'/> Tag your flow!</label>
                <div className="tags">
                    {extractedTags.map((tag, index) => {
                        return (
                            <Tag color={mapStringToColor(tag)} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                    {tags.map((tag, index) => {
                        return (
                            <Tag closable color={mapStringToColor(tag)} key={tag} afterClose={() => this.handleClose(tag)}>
                                {tag}
                            </Tag>
                        );
                    })}
                    {inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                            <Icon type="plus" /> New Tag
                        </Tag>
                    )}
                </div>
            </div>
		);
	}
}

export default FinalStep;
