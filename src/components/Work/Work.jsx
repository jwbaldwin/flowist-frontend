import React, { Component } from 'react';
import { Layout, Icon, Col, Empty, Card, Comment, Avatar, Form, Button, List, Input, } from 'antd';
import WorkTimeline from './WorkTimeline';
import WorkInput from './WorkInput';
import styled from 'styled-components';
import moment from 'moment';

const { Content } = Layout;
const TextArea = Input.TextArea;

const WorkCard = styled(Card)`
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.backgroundColor};
    transiton: ${({ theme }) => theme.transiton};
    margin-top: 1em !important;
`;

const Logs = styled(List)`
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.backgroundColor};
    transiton: ${({ theme }) => theme.transiton};
    text-align: left;
    .ant-comment-content-author-name {
         color: ${({ theme }) => theme.textColor};
    }

    .ant-comment-content-author-time{
        color: ${({ theme }) => theme.secondaryContentBackgroundColor};
    }

    .ant-comment-inner {
        padding: 8px 0 !important;
    }
`;

const WorkLogger = styled(TextArea)`
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.contentBackgroundColor};
    transiton: ${({ theme }) => theme.transiton};
`;

const LogsList = ({ logs }) => (
    <Logs
        dataSource={logs}
        header={`${logs.length} ${logs.length > 1 ? 'entries' : 'entry'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

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
                    icon="double-right"
                    block
                >
                    Log
                </Button>
            </Form.Item>
        </div>
    );

export class Work extends Component {
    state = {
        logs: [],
        submitting: false,
        value: ''
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }
         this.setState({
            submitting: true,
        });

        this.setState({
            submitting: false,
            value: '',
            logs: [
                ...this.state.logs,
                {
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{this.state.value}</p>,
                    datetime: moment().fromNow(),
                }
            ],
        });
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    logWork = (work) => {
        work.created = moment.now();
        this.setState({
            logs: [...this.state.logs, work]
        })
    }

    render() {
        const { logs, submitting, value } = this.state;

        return (
            <Content className="centered">
                <Col span={24}>
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
                    </WorkCard>
                </Col>
            </Content>
        );
    }
}

export default Work;


                        // <WorkTimeline logs={this.state.logs} />
                        // <WorkInput log={this.logWork}/>