import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as logActions from '../../actions/logActions';
import { Layout, Col, Card, Comment, Button, List, Input, Spin, Icon, Menu, Dropdown, Modal } from 'antd';
import styled, { withTheme } from 'styled-components';
import MicrolinkCard from '@microlink/react'
import moment from 'moment';

const { Content } = Layout;
const TextArea = Input.TextArea;
const confirm = Modal.confirm;

const WorkCard = styled(Card)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.content};
    box-shadow: ${({ theme }) => theme.boxShadow};
    transiton: ${({ theme }) => theme.transiton};
    margin-top: 1em !important;

    .ant-btn-unselected {
        background: transparent !important;
        border: none;
    }
`;

const Logs = styled(List)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.content};
    transiton: ${({ theme }) => theme.transiton};
    line-height: 1.25 !important;
    text-align: left;

    .ant-comment-inner {
        padding: 0 !important;
    }

    .ant-comment-content-author-name {
         color: ${({ theme }) => theme.brightText};
         font-weight: 600 !important;
    }

    .ant-comment-content-author-time{
        color: ${({ theme }) => theme.defaultText};
    }

    .ant-comment-content-detail {

    }

    .ant-comment-actions {
        margin-top: 0;
        float: right;
    }
    .ant-comment-actions > li{
        color: ${({ theme }) => theme.brightText};
        margin: 4px;
    }

    .ant-comment-actions > li:hover{
        color: ${({ theme }) => theme.primaryColor};
    }

    &.ant-list-split .ant-list-header {
        border: none;
    }
`;

const StyledMicroLink = styled(MicrolinkCard)`
  width: 100%;
  border-radius: 8px;
`

const WorkLogger = styled(TextArea)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.contentOther};
    transiton: ${({ theme }) => theme.transiton};
    border: ${({ theme }) => theme.border} !important;
`;

const LinkLogger = styled(Input)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.contentOther};
    transiton: ${({ theme }) => theme.transiton};
    border: ${({ theme }) => theme.border} !important;
`;

const WorkTypeButton = styled(Button)`
    margin-right: 8px
    color: ${({ theme }) => theme.primaryColor};
    background: ${({ theme }) => theme.secondaryColor};
    border: none !important;
`

export class Work extends Component {
    state = {
        type: 'log',
        value: '',
        submitting: false,
        editVisible: false,
    }

    componentDidMount() {
        this.props.logActions.fetchLogs(this.props.flow_id);
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    handleType = (type) => {
        this.setState({
            type: type,
        });
    }

    handleSubmit = () => {
        if (!this.state.value || this.state.value.length === 0) {
            return;
        }
        this.setState({ submitting: true })
        this.props.logActions.addLog(this.props.flow_id,
            {
                author: this.props.user.user.attributes.name + ' ' + this.props.user.user.attributes.family_name,
                type: this.state.type,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: this.state.value,
                created: moment()
            })
        this.setState({
            submitting: false,
            value: ''
        });
    }

    deleteItem = (flow_id, log_id) => {
        this.props.logActions.deleteLog(flow_id, log_id);
    }

    showDeleteConfirm = (flow_id, log_id, callback) => {
        confirm({
            title: 'Are you sure you want to delete this log',
            content: "This can't be undone.",
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                callback(flow_id, log_id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const { user, logs, isLoading } = this.props;
        const { value, submitting } = this.state;

        const optionsMenu = (flow_id, log_id) => (
            <Menu>
                <Menu.Item key="0" onClick={() => this.showDeleteConfirm(flow_id, log_id, this.deleteItem)}>
                    <Icon type="delete" style={{ fontSize: 16 }} onClick={() => this.showDeleteConfirm(flow_id, log_id, this.deleteItem)} /> Delete
                </Menu.Item>
            </Menu>
        );

        const LogsList = ({ logs }) => (
            <Logs
                dataSource={logs}
                header={<span>{logs.length} <Icon type="book" /></span>}
                itemLayout="horizontal"
                renderItem={log => <Comment
                    actions={[<Dropdown trigger={['click']} overlay={optionsMenu(this.props.flow_id, log.id)} placement="topCenter">
                        <Icon type="more" style={{ fontSize: 16 }} />
                    </Dropdown>]}
                    author={log.author}
                    avatar={log.avatar}
                    content={log.type === 'link' ? <StyledMicroLink url={log.content} /> : log.content}
                    datetime={moment().to(log.created)} />}
            />
        );

        return (
            <Content className="centered">
                <Col span={24}>
                    {isLoading ?
                        <Spin size="small" /> :
                        <WorkCard
                            bordered={false}>
                            {logs.length > 0 && <LogsList logs={logs} />}
                        </WorkCard>}
                    <WorkCard bordered={false}>
                        <div style={{textAlign: 'left', paddingBottom: '8px'}}>
                            <WorkTypeButton
                                type={this.state.type === 'log' ? "primary" : "unselected"}
                                icon="rocket"
                                onClick={() => this.handleType('log')}>Log</WorkTypeButton>
                            <WorkTypeButton
                                type={this.state.type === 'link' ? "primary" : "unselected"}
                                icon="link"
                                onClick={() => this.handleType('link')}>Link</WorkTypeButton>
                        </div>
                        {this.state.type === 'log' ?
                            <WorkLogger placeholder="What's new?" rows={2} onChange={this.handleChange} value={value} onPressEnter={this.handleSubmit} />
                            :
                            <LinkLogger placeholder="Paste the link!" onChange={this.handleChange} value={value} onPressEnter={this.handleSubmit}/>
                        }
                        <div style={{textAlign: 'right', paddingTop: '8px'}}>
                            <Button
                                loading={submitting}
                                onClick={this.handleSubmit}
                                type="primary"
                            >
                                {"Add " + this.state.type}
                            </Button>
                        </div>
                    </WorkCard>
                </Col>
            </Content>
        );
    }
}

Work.propTypes = {
    logs: PropTypes.array,
    user: PropTypes.object,
    isLoading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        user: state.user,
        logs: state.logs.data,
        isLoading: state.logs.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logActions: bindActionCreators(logActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Work));
