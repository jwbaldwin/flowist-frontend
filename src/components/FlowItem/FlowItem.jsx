import React, { Component } from 'react';
import './FlowItem.css';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import createPrismPlugin from 'draft-js-prism-plugin';
import Editor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import Prism from 'prismjs';

export class FlowItem extends Component {
	state = {
		editorState: EditorState.createEmpty(),
		plugins: [ 
			createPrismPlugin({
				prism: Prism
			  }),
			createMarkdownPlugin() ]
	};

	onChange = (editorState) => {
		this.setState({
			editorState
		});
	};

	render() {
		return (
						<Editor
							editorState={this.state.editorState}
							onChange={this.onChange}
							plugins={this.state.plugins}
							autoFocus
							placeholder="Start writing your thoughts. We support Markdown!"
						/>
		);
	}
}

export default FlowItem;
