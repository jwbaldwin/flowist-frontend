import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as logActions from '../../actions/logActions';
import { Layout, Col, Card, Comment, Avatar, Form, Button, List, Input, Spin, Icon, Menu, Dropdown, Modal } from 'antd';
import styled from 'styled-components';
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
        margin: 0 6px;
    }

    &.ant-list-split .ant-list-header {
        border: none;
    }
`;

const WorkLogger = styled(TextArea)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.contentOther};
    transiton: ${({ theme }) => theme.transiton};
    border: ${({ theme }) => theme.border} !important;
`;

const Editor = ({
    onChange, onSubmit, submitting, value,
}) => (
        <div>
            <Form.Item style={{margin: 2}}>
                <WorkLogger rows={2} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item style={{margin: 0}}>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                    icon="rocket"
                    block
                >
                    Log
                </Button>
            </Form.Item>
        </div>
    );

export class Work extends Component {
    state = {
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

    handleSubmit = () => {
        if (!this.state.value || this.state.value.length === 0) {
            return;
        }
        this.setState({submitting: true})
        this.props.logActions.addLog(this.props.flow_id,
                    {
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: this.state.value,
                    created: moment()})
        this.setState({
            submitting: false,
            value: ''});
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
        const { logs, isLoading } = this.props;
        const { value, submitting } = this.state;

        const optionsMenu = (flow_id, log_id) => (
            <Menu>
                <Menu.Item key="0" onClick={() => this.showDeleteConfirm(flow_id, log_id, this.deleteItem)}>
                    <Icon type="delete" style={{fontSize: 16}} onClick={() => this.showDeleteConfirm(flow_id, log_id, this.deleteItem)}/> Delete
                </Menu.Item>
            </Menu>
        );

        const LogsList = ({ logs }) => (
            <Logs
                dataSource={logs}
                header={<span>{logs.length} <Icon type="book"/></span> }
                itemLayout="horizontal"
                renderItem={log => <Comment
                                        actions={[  <Dropdown trigger={['click']} overlay={optionsMenu(this.props.flow_id, log.id)} placement="topCenter">
                                                        <Icon type="more" style={{ fontSize: 16 }} />
                                                    </Dropdown>]}
                                        author={log.author}
                                        avatar={log.avatar}
                                        content={log.content}
                                        datetime={moment().from(log.created)}/>}
            />
        );

        return (
            <Content className="centered">
                <Col span={24}>
                    { isLoading ?
                    <Spin size="small" /> :
                    <WorkCard
                        bordered={false}>
                        {logs.length > 0 && <LogsList logs={logs} />}
                        <Comment
                            avatar={(
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            )}
                            content={(
                                <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            )}
                        />
                    </WorkCard>}
                </Col>
            </Content>
        );
    }
}

Work.propTypes = {
	logs: PropTypes.array,
    isLoading: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		logs: state.logs.data,
        isLoading: state.logs.isLoading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logActions: bindActionCreators(logActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Work);
