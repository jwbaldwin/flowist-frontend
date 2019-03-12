import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import { stateToMarkdown } from "draft-js-export-markdown";
import { stateFromMarkdown } from "draft-js-import-markdown";
import './MainStep.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';

const tooltipHelpText = "Enter any extra information about what you're working on! Supports: Inline markdown, tags, and links!";

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const markdownPlugin = createMarkdownShortcutsPlugin();

const plugins = [
    linkifyPlugin,
    hashtagPlugin,
    markdownPlugin,
];

export class MainStep extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }

    componentDidMount = () => {
        if (this.props.flowData.content.length !== 0) {
            this.setState({ editorState: EditorState.createWithContent(stateFromMarkdown(this.props.flowData.content)) });
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
