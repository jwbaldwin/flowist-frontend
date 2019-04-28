import React, { Component } from 'react';
import { Comment, List, Avatar, Skeleton, Icon, Menu, Dropdown, Select } from 'antd';
import MicrolinkCard from '@microlink/react'
import styled from 'styled-components';
import moment from 'moment';

const Option = Select.Option;

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

const WorkFilter = styled(Select)`
    color: ${({ theme }) => theme.primaryColor};
    background: ${({ theme }) => theme.secondaryColor};
    border: none !important;
    border-radius: 4px;
    .ant-select-selection {
        color: ${({ theme }) => theme.primaryColor};
        background: ${({ theme }) => theme.secondaryColor};
        border: none !important;
    }

    .ant-select-arrow > .anticon {
        color: ${({ theme }) => theme.defaultText};
    }
`

export class WorkList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: 'all',
            filtered_logs: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.logs !== nextProps.logs) {
            return ({
                filtered_logs: nextProps.logs,
                logs: nextProps.logs
            })
        } else { return null }
    }

    applyFilter = (value) => {
        const logs = this.state.logs;
        if (value === "all") {
            this.setState({
                filtered_logs: logs,
                filter: value
            });
        } else {
            this.setState({
                filtered_logs: logs.filter(log => log.type === value),
                filter: value
            });
        }

    }

    render() {
        const { flow_id, logs } = this.props;
        console.log(this.state.logs)
        const optionsMenu = (flow_id, log_id, showDeleteConfirm, deleteItem) => (
            <Menu>
                <Menu.Item key="0" onClick={() => showDeleteConfirm(flow_id, log_id, deleteItem)}>
                    <Icon type="delete" style={{ fontSize: 16 }} onClick={() => showDeleteConfirm(flow_id, log_id, deleteItem)} /> Delete
                </Menu.Item>
            </Menu>
        );

        const logsHeader = (
            <div style={{width: '100%', margin: '4px 0'}}>
                {this.state.filtered_logs.length} <Icon type="book" />
                <WorkFilter
                    style={{ width: 100, float: 'right' }}
                    value={this.state.filter}
                    optionFilterProp="children"
                    onChange={this.applyFilter}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="all"><Icon type="filter" /> All</Option>
                    <Option value="log"><Icon type="rocket" /> Logs</Option>
                    <Option value="link"><Icon type="link" /> Links</Option>
                </WorkFilter>
            </div>
        );

        return (
            <Logs
                dataSource={this.state.filtered_logs}
                header={logsHeader}
                itemLayout="horizontal"
                renderItem={
                    log =>
                    <Skeleton avatar title={false} loading={this.props.isLoading} active>
                        <Comment
                            actions={[<Dropdown trigger={['click']} overlay={optionsMenu(this.props.flow_id, log.id, this.props.showDeleteConfirm, this.props.deleteItem)} placement="topCenter">
                                <Icon type="more" style={{ fontSize: 16 }} />
                            </Dropdown>]}
                            author={log.author}
                            avatar={log.avatar}
                            content={log.type === 'link' ? <StyledMicroLink url={log.content} /> : log.content}
                            datetime={moment().to(log.created)} />
                    </Skeleton>}
            />
        );
    }
}

export default WorkList;
