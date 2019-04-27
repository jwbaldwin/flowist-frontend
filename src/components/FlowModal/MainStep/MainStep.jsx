import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import { stateToMarkdown } from "draft-js-export-markdown";
import { stateFromMarkdown } from "draft-js-import-markdown";
import './MainStep.scss';

const tooltipHelpText = "Enter any extra information about what you're working on! Supports inline markdown!";

const prismPlugin = createPrismPlugin({prism: Prism});
const markdownPlugin = createMarkdownShortcutsPlugin();

const plugins = [
    prismPlugin,
    markdownPlugin,
];

export class MainStep extends Component {
    constructor(props) {
        super(props); 
        if (this.props.flowData.content.length !== 0) {
            this.state = { 
                editorState: EditorState.createWithContent(stateFromMarkdown(this.props.flowData.content)) 
            };
        } else {
            this.state = { 
                editorState: EditorState.createEmpty(),
            }
        }
    }

    onChange = (editorState) => {
        this.props.handleContentChange(stateToMarkdown(editorState.getCurrentContent()))
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

	render() {
		return (
            <div>
                <Tooltip title={tooltipHelpText}>
                    <Icon type='info-circle' style={{ float: 'right', margin: 10, color: 'rgba(0,0,0,.45)' }}/>
                </Tooltip>
                <label htmlFor='editor-content'><Icon type='code'/> Notes</label>
                <div className='editor' id='editor-content' onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                </div>
            </div>
		);
	}
}

export default MainStep;
