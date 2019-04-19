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
import FlowModal from '../FlowModal';
import styled, { withTheme } from 'styled-components';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import './FlowItem.scss';

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

const FlowCard = styled(Card)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.content};
    box-shadow: ${({ theme }) => theme.boxShadow};

    #content {
        border-left: 3px solid ${({ theme }) => theme.defaultText};
        border-radius: 4px !important;
        cursor: text;
        padding: 16px;
        background: ${({ theme }) => theme.contentOther};
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${({ theme }) => theme.brightText};
    }
`;

const TitleText = styled.h1`
    color: ${({ theme }) => theme.brightText};
    font-weight: 600 !important;
`


class FlowItem extends Component {
    state = {
        visible: false
    }

    deleteItem = (id) => {
         this.props.flowActions.deleteFlow(id);
    }

    completeItem = () => {
        this.props.flowActions.updateFlow({ ...this.props.flow, flowStatus: 'COMPLETED' });
    }

    editItem = (id) => {
        console.log(id)
    }

    onChange = () => {return null;}

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

    showEditModal = (id) => {
        this.setState({visible: !this.state.visible})
    }

    render() {
        const { flow } = this.props;
        const created = new Date(flow.created);

        const optionsMenu = (id) => (
            <Menu>
                <Menu.Item key="0" onClick={() => this.showDeleteConfirm(id, this.deleteItem)}>
                    <Icon type="delete" theme="twoTone" twoToneColor={this.props.theme.errorColor} style={{ fontSize: 18 }} /> Delete
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
                <Menu.Item key="4" onClick={() => this.showEditModal(id)}>
                    <Icon type="edit" theme="twoTone" twoToneColor={this.props.theme.warningColor} /> Edit
                    </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <FlowModal visible={this.state.visible} flow={flow} type="update"/>
                <FlowCard
                    bordered={false}
                    actions={[
                        <Dropdown trigger={['click']} overlay={optionsMenu(flow.id)} placement="topCenter">
                            <Icon type="more" style={{ fontSize: 18, color: this.props.theme.brightText }} />
                        </Dropdown>,
                        <Icon type="check-circle" onClick={() => this.completeItem(flow.id)} 
                              fill={ this.props.theme.background }
                              style={{ fontSize: 18, color: this.props.theme.successColor }} />
                    ]}
                    extra={<Badge status={mapFlowStatusToBadge(flow.flowStatus)} />}
                    title={<TitleText><Icon type={mapIcon(flow.activity)} id="flow-activity-icon" /> {flow.title} </TitleText>}
                >
                    <Card.Grid style={contentStyle} className="flow-card-content">
                        <div id='content'>
                            <Editor
                                onChange={this.onChange}
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
                </FlowCard>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FlowItem));
