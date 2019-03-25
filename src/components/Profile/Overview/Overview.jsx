import React, { Component } from 'react';
import { Layout, Row, Col, Statistic, Icon } from 'antd';
import Chart from 'react-apexcharts'

const { Content } = Layout;

export class Overview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pieOptions: {
                chart: {
                    id: 'flow-breakdown-pie-chart'
                },
                labels: ["Active", "Completed", "Paused"]
            },
            radarOptions: {
                chart: {
                    id: 'flow-breakdown-radar-chart'
                },
                labels: ["Active", "Completed", "Paused"]
            },
        }
    }

    render() {
        const flows = this.props.flows;
        const active = flows.filter(flow => flow.flowStatus === 'ACTIVE').length;
        const completed = flows.filter(flow => flow.flowStatus === 'COMPLETED').length;
        const paused = flows.filter(flow => flow.flowStatus === 'PAUSED').length;

        return (
            <Content>
                <Row type="flex" justify="center">
                    <Col xs={24} sm={24} md={3} lg={3}>
                        <Statistic title="Total Flows" value={flows.length} prefix={<Icon type="coffee" />} />
                    </Col>
                    <Col xs={24} sm={24} md={3} lg={3}>
                        <Statistic title="Active" value={active} prefix={<Icon type="thunderbolt" />} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: '1em', height: '50%' }}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Chart
                            className="centered"
                            options={this.state.pieOptions}
                            series={[active, completed, paused]}
                            type="pie"
                            width={500}
                            height={320} />
                        <Chart
                            className="centered"
                            options={this.state.radarOptions}
                            series={[{
                                name: 'Amount',
                                data: [active, completed, paused],
                                }]}
                            type="radar"
                            width={500}
                            height={320} />
                    </Col>
                </Row>
            </Content>
        );
    }
}

export default Overview;
