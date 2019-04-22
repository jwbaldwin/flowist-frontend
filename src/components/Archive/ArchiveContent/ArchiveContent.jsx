import React, { Component } from 'react';
import { Layout, List, Icon, Skeleton, Typography, Tag, Badge, Drawer, Button } from 'antd';
import { mapIcon, mapFlowStatusToBadge, mapStringToColor } from '../../../common';
import FlowItem from '../../FlowItem';
import styled, { withTheme } from 'styled-components';
import moment from "moment";
import './ArchiveContent.scss';

const { Content } = Layout;
const { Text } = Typography;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

const StyledList = styled(List)`
    color: ${({ theme }) => theme.defaultText};
    background: ${({ theme }) => theme.content};
    border: 1px solid ${({ theme }) => theme.content};
    box-shadow: ${({ theme }) => theme.boxShadow};
    padding: 24px;
    border-radius: 8px;

    &.ant-list-bordered .ant-list-item, &.ant-list-split .ant-list-header {
        border-bottom: none;
    }

    .ant-badge-dot {
        box-shadow: 0 0 0 1px ${({ theme }) => theme.content};
    }
`;

const TitleText = styled.h4`
    color: ${({ theme }) => theme.brightText};
    font-weight: 600 !important;
`

export class ArchiveContent extends Component {
    state = {
        visible: false,
        drawerContentId: ''
    };

    showItem = (id) => {
        this.setState({ visible: !this.state.visible });
        this.setState({ drawerContentId: id });
    }

    handleClose = () => {
        this.setState({ visible: false });
    }

    render() {
        return (
            <Content>
                <StyledList
                    bordered
                    className="archive-list"
                    loading={this.props.isLoading}
                    itemLayout="horizontal"
                    loadMore=''
                    dataSource={this.props.flows}
                    renderItem={(item) => (
                        <List.Item actions={[<Button type="primary" onClick={() => this.showItem(item.id)}><IconText type="plus-circle" text="more" /></Button>,]}
                                    extra={<span>{moment().to(item.created)}</span>}>
                            <Skeleton avatar title={false} loading={this.props.isLoading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Badge status={mapFlowStatusToBadge(item.flowStatus)}>
                                            <Icon type={mapIcon(item.activity)} style={{ fontSize: '24px' }} />
                                        </Badge>
                                    }
                                    title={<TitleText>{item.title}</TitleText>}
                                    description={item.tags.map(tag => <Tag color={mapStringToColor(tag)}>{tag}</Tag>)}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />

                <Drawer
                    placement="bottom"
                    onClose={() => this.handleClose()}
                    visible={this.state.visible}
                >
                        <FlowItem
                            flow={this.props.flows.filter(flow => flow.id === this.state.drawerContentId)[0]}
                            key={this.drawerContentId}
                            />
                </Drawer>
            </Content>
        );
    }
}

export default withTheme(ArchiveContent);
