import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Badge, Card, Icon, Dropdown, Menu, Modal } from 'antd';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import { stateFromMarkdown } from "draft-js-import-markdown";
import { mapIcon, mapFlowStatusToBadge } from '../../common';
import FlowTagsFooter from './FlowTagsFooter';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import './FlowItem.css';

const confirm = Modal.confirm;

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const markdownPlugin = createMarkdownShortcutsPlugin();

const plugins = [
    linkifyPlugin,
    hashtagPlugin,
    markdownPlugin,
];

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
    deleteItem = (id) => {
         this.props.flowActions.deleteFlow(id);
    }

    completeItem = () => {
        this.props.flowActions.updateFlow({ ...this.props.flow, flowStatus: 'COMPLETED' });
    }

    showDeleteConfirm = (id, callback) => {
        confirm({
            title: 'Are you sure you want to delete this flow?',
            content: "This can't be undone.",
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                callback(id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const { flow } = this.props;
        const created = new Date(flow.created);

        const optionsMenu = (id) => (
            <Menu>
                <Menu.Item key="0" onClick={() => this.showDeleteConfirm(id, this.deleteItem)}>
                    <Icon type="delete" theme="twoTone" twoToneColor="#f5222d" style={{ fontSize: 18 }} /> Delete
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
                <Menu.Divider />
                <Menu.Item key="4">
                    <Icon type="edit" theme="twoTone" twoToneColor="#faad14" /> Edit
                    </Menu.Item>
            </Menu>
        );

        return (
            <Card
                bordered={false}
                actions={[
                    <Dropdown trigger={['click']} overlay={optionsMenu(flow.id)} placement="topCenter">
                        <Icon type="more" style={{ fontSize: 18 }} />
                    </Dropdown>,
                    <Icon type="check-circle" onClick={() => this.completeItem(flow.id)} theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: 18 }} />
                ]}
                extra={<Badge status={mapFlowStatusToBadge(flow.flowStatus)} />}
                title={<span><Icon type={mapIcon(flow.activity)} id="flow-activity-icon" /> {flow.title} </span>}
            >
                <Card.Grid style={contentStyle} className="flow-card-content">
                    <div id='content'>
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
                    {created.toDateString().toLocaleLowerCase()}
                </Card.Grid>
            </Card>
        );
    }
}

FlowItem.propTypes = {
    flowActions: PropTypes.object,
    isLoading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        isLoading: state.flow.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        flowActions: bindActionCreators(flowActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowItem);
