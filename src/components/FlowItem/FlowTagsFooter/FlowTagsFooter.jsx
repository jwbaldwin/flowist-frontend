import React, { Component } from 'react';
import { Tag, Layout, Icon } from 'antd';
import './FlowTagsFooter.css';

export default class FlowTagsFooter extends Component {
	render() {
		return (
			<Layout id='flow-tags-footer'>
				<Icon type='tags' id='tags-icon'/>
				{this.props.tags.map((tag, index) => (
					<Tag key={index}>
						{tag}
					</Tag>
				))}
			</Layout>
		);
	}
}
