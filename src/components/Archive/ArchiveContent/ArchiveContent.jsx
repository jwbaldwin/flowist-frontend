import React, { Component } from 'react';
import { Layout, Row, Col, List, Icon, Button, Skeleton, Avatar } from 'antd';
import mapIcon from '../../../common';

const { Content } = Layout;

export class ArchiveContent extends Component {
	render() {
		return (
			<Content>
				{/* <Row type="flex" justify="space-around" align="middle">
                        { this.props.flows
                            .map((flow, key) =>
                                <Col xs={24} sm={24} md={18} lg={16} xl={11} style={{marginTop: '1vh', marginBottom: '1vh'}}>
                                        <FlowItem flow={flow} key={key} />
                                </Col>
                            )
                        }
                    </Row> */}
				<List
                    bordered
                    header={"Archived Flows"}
					className="archive-list"
					loading={this.props.isLoading}
					itemLayout="horizontal"
                    loadMore=''
                    style={{ background:'#fff', }}
					dataSource={this.props.flows}
					renderItem={(item) => (
						<List.Item actions={[ <a>edit</a>, <a>more</a> ]}>
							<Skeleton avatar title={false} loading={this.props.isLoading} active>
								<List.Item.Meta
									avatar={
                                    <Avatar icon={mapIcon(item.activity)} style={{fontSize:'18px'}} />
									}
									title={<a href="https://ant.design">{item.title}</a>}
									description="Ant Design, a design language for background applications, is refined by Ant UED Team"
								/>
								<div>content</div>
							</Skeleton>
						</List.Item>
					)}
				/>
			</Content>
		);
	}
}

export default ArchiveContent;
