import React, { Component } from 'react';
import { Layout, List, Icon, Skeleton, Typography, Tag, Badge, Collapse, Drawer, Col } from 'antd';
import { mapIcon, mapFlowStatusToBadge } from '../../../common';
import FlowItem from '../../FlowItem';

const { Content } = Layout;
const Panel = Collapse.Panel;
const { Text } = Typography;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
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
                        <List.Item actions={[<a onClick={() => this.showItem(item.id)}><IconText type="plus-circle" text="more" /></a>,
                                             <IconText type="edit" text="edit" />, <IconText type="star-o" text="0 " />]}>
                            <Skeleton avatar title={false} loading={this.props.isLoading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Badge status={mapFlowStatusToBadge(item.flowStatus)}>
                                            <Icon type={mapIcon(item.activity)} style={{ fontSize: '24px' }} />
                                        </Badge>
                                    }
                                    title={<Text strong>{item.title}</Text>}
                                    description={item.tags.map(tag => <Tag>{tag}</Tag>)}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />

                <Drawer
                    height="60%"
                    placement="bottom"
                    title="Your archived flow"
                    onClose={() => this.handleClose()}
                    visible={this.state.visible}
                >
                    <Col xs={0} sm={0} md={3} lg={4} xl={6} />
                    <Col xs={24} sm={24} md={18} lg={16} xl={12} style={{marginTop: '1vh', marginBottom: '1vh'}}>
                        <FlowItem
                            flow={this.props.flows.filter(flow => flow.id === this.state.drawerContentId)[0]}
                            key={this.drawerContentId}
                            />
                    </Col>
                </Drawer>
            </Content>
        );
    }
}

export default ArchiveContent;
