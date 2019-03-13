import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Badge, Card, Icon, message, Popconfirm, Dropdown, Menu } from 'antd';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import { stateFromMarkdown } from "draft-js-import-markdown";
import './FlowItem.css';
import FlowTagsFooter from './FlowTagsFooter';
import 'draft-js-hashtag-plugin/lib/plugin.css';


const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const markdownPlugin = createMarkdownShortcutsPlugin();

const plugins = [
    linkifyPlugin,
    hashtagPlugin,
    markdownPlugin,
];

const iconMap = {
	coding: 'laptop',
	researching: 'search',
	debugging: 'alert',
    planning: 'schedule'
};

const optionsMenu = (
	<Menu>
        <Menu.Item key="0">
            <Icon type="edit" /> Edit
		</Menu.Item>
        <Menu.Divider />
		<Menu.Item key="1">
			<Icon type="pause-circle" /> Pause
		</Menu.Item>
		<Menu.Item key="2">
			<Icon type="share-alt" /> Link to flow
		</Menu.Item>
        <Menu.Item key="3">
			<Icon type="link" /> Add files
		</Menu.Item>
	</Menu>
);

const contentStyle = {
  width: '100%',
  textAlign: 'left',
};

const tagsFooterStyle = {
  width: '80%',
  textAlign: 'left',
};

const timestampStyle = {
  width: '20%',
  textAlign: 'right',
  justify: 'bottom',
};

class FlowItem extends Component {

    focus = () => {
        this.editor.focus();
    };

    getFlowStatusIcon = (flowStatus) => {
        switch(flowStatus) {
            case 'ACTIVE':
                return  <Badge status="processing"/>
            case 'PAUSED':
                return  <Badge status="warning" />
            case 'COMPLETED':
                return  <Badge status="success" />
            default:
                return  <Badge status="processing"/>
        }
    }

    deleteItem = (id) => {
        this.props.flowActions.deleteFlow(id);
        this.props.deleteError ?
            message.error("Uhoh. We couldn't delete the message 👾")
            : this.showMessage("Flow deleted!")

    }

    completeItem = () => {
        this.props.flowActions.updateFlow({ ...this.props.flow, flowStatus: 'COMPLETED' });
        this.props.updateError ?
             message.error("Uhoh. We couldn't add the message 👾")
            : this.showMessage("Flow completed! Congrats! 🎉");
    }

    showMessage = (msg) => {
		message.success(msg);
	};

	render() {
		const { flow } = this.props;
		const created= new Date(flow.created);

		return (
                <Card
                    actions={[
                        <Popconfirm placement="topLeft" arrowPointAtCenter title="Are you sure delete this flow?" onConfirm={() => this.deleteItem(flow.id)} okText="Yep" cancelText="Cancel">
                            <Icon type="delete" theme="twoTone" twoToneColor="#f5222d" style={{fontSize: 18}}/>
                        </Popconfirm>,
                        <Dropdown trigger={[ 'hover', 'click' ]} overlay={optionsMenu} placement="bottomCenter">
                            <Icon type="ellipsis" style={{fontSize: 18}}/>
                        </Dropdown>,
                        <Icon type="check-circle" onClick={() => this.completeItem(flow.id)} theme="twoTone" twoToneColor="#52c41a" style={{fontSize: 18}}/>
                    ]}
                    extra={this.getFlowStatusIcon(flow.flowStatus)}
                    title={<span><Icon type={iconMap[flow.activity]} id="flow-activity-icon"/> {flow.title} </span>}
                >
                        <Card.Grid style={contentStyle} className="flow-card-content">
                            <div className='editor' id='editor-content' onClick={this.focus}>
                                <Editor
                                    readOnly={true}
                                    editorState={EditorState.createWithContent(stateFromMarkdown(flow.content))}
                                    plugins={plugins}
                                    ref={(element) => { this.editor = element; }}
                                />
                            </div>
                        </Card.Grid>
                        <Card.Grid style={tagsFooterStyle} className="flow-card-tags">
                            <FlowTagsFooter tags={flow.tags} />
                        </Card.Grid>
                        <Card.Grid style={timestampStyle} className="flow-card-timestamp">
                            { created.toDateString().toLocaleLowerCase() }
                        </Card.Grid>
                </Card>
		);
	}
}

FlowItem.propTypes = {
	flowActions: PropTypes.object,
	flow: PropTypes.object,
    addError: PropTypes.bool,
    fetchError: PropTypes.bool,
    updateError: PropTypes.bool,
    deleteError: PropTypes.bool,
	isLoading: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		flow: state.flow.data,
        addError: state.flow.addError,
        updateError: state.flow.updateError,
        deleteError: state.flow.deleteError,
		isLoading: state.flow.isLoading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		flowActions: bindActionCreators(flowActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowItem);
