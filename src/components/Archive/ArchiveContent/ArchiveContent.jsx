import React, { Component } from 'react';
import { Layout, List, Icon, Skeleton, Typography, Tag, Badge, Drawer, Button } from 'antd';
import { mapIcon, mapFlowStatusToBadge, mapStringToColor } from '../../../common';
import FlowItem from '../../FlowItem';
import { withTheme } from 'styled-components';
import moment from "moment";
import './ArchiveContent.scss';

const { Content } = Layout;
const { Text } = Typography;

const IconText = ({ type, text, color }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8, color: color }} />
        {text}
    </span>
);

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
                <List
                    bordered
                    header={"Archived Flows"}
                    className="archive-list"
                    loading={this.props.isLoading}
                    itemLayout="horizontal"
                    loadMore=''
                    style={{ background: '#fff' }}
                    dataSource={this.props.flows}
                    renderItem={(item) => (
                        <List.Item actions={[<Button onClick={() => this.showItem(item.id)}><IconText type="plus-circle" text="more" color={this.props.theme.successColor} /></Button>,]}
                                    extra={<span>{moment().to(item.created)}</span>}>
                            <Skeleton avatar title={false} loading={this.props.isLoading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Badge status={mapFlowStatusToBadge(item.flowStatus)}>
                                            <Icon type={mapIcon(item.activity)} style={{ fontSize: '24px' }} />
                                        </Badge>
                                    }
                                    title={<Text strong>{item.title}</Text>}
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
