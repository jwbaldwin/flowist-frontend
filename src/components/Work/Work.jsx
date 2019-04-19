import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as logActions from '../../actions/logActions';
import { Layout, Col, Card, Comment, Avatar, Form, Button, List, Input, Spin, Icon } from 'antd';
import WorkTimeline from './WorkTimeline';
import WorkInput from './WorkInput';
import styled, { withTheme } from 'styled-components';
import moment from 'moment';

const { Content } = Layout;
const TextArea = Input.TextArea;

const WorkCard = styled(Card)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.content};
    transiton: ${({ theme }) => theme.transiton};
    margin-top: 1em !important;
`;

const Logs = styled(List)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.content};
    transiton: ${({ theme }) => theme.transiton};
    text-align: left;
    .ant-comment-content-author-name {
         color: ${({ theme }) => theme.defaultText};
    }

    .ant-comment-content-author-time{
        color: ${({ theme }) => theme.header};
    }

    .ant-comment-inner {
        padding: 8px 0px !important;
    }

    .ant-comment-actions {
        float: right;
    }
    .ant-comment-actions > li{
        margin: 0 6px;
    }
`;

const WorkLogger = styled(TextArea)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.background};
    transiton: ${({ theme }) => theme.transiton};
`;

const Editor = ({
    onChange, onSubmit, submitting, value,
}) => (
        <div>
            <Form.Item>
                <WorkLogger rows={2} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                    icon="read"
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
        submitting: false
    }

    componentDidMount() {
		this.props.logActions.fetchLogs(this.props.flow_id);
	}

    handleSubmit = () => {
        if (!this.state.value || this.state.value.length === 0) {
            return;
        }
        this.setState({submitting: true})
        this.props.logActions.addLog({
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: this.state.value,
                    created: moment().now()})
        this.setState({
            submitting: false,
            value: ''});
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const { logs, isLoading } = this.props;
        const { value, submitting } = this.state;
        const LogsList = ({ logs }) => (
            <Logs
                dataSource={logs}
                header={<span>{logs.length} <Icon type="book"/></span> }
                itemLayout="horizontal"
                renderItem={props => <Comment
                                        actions={[<Icon type="edit" style={{color: this.props.theme.warningColor, fontSize: 16}}/>,
                                                <Icon type="delete" style={{color: this.props.theme.errorColor, fontSize: 16}}/>]}
                                        author={props.author}
                                        avatar={props.avatar}
                                        content={props.content}
                                        datetime={moment().to(props.created)} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Work));
