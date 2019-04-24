import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as logActions from '../../actions/logActions';
import { Layout, Col, Card, Comment, Avatar, Form, Button, List, Input, Spin, Icon } from 'antd';
import styled from 'styled-components';
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
         color: ${({ theme }) => theme.brightText};
         font-weight: 600 !important;
    }

    .ant-comment-content-author-time{
        color: ${({ theme }) => theme.defaultText};
    }

    .ant-comment-actions {
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
                                        actions={[<Icon type="edit" style={{fontSize: 16}}/>,
                                                <Icon type="delete" style={{fontSize: 16}}/>]}
                                        author={props.author}
                                        avatar={props.avatar}
                                        content={props.content}
                                        datetime={moment().from(props.created)} />}
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
