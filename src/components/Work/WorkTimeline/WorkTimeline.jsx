import React, { Component } from 'react';
import { Timeline, Icon } from 'antd';
import styled, { withTheme } from 'styled-components';

const StyledTimeline = styled(Timeline)`
    color: ${({ theme }) => theme.textColor};
    margin: 2em !important;
    .ant-timeline-item-head-custom {
        background-color: ${({ theme }) => theme.contentBackgroundColor};
    }
    .ant-timeline-item-head {
        background-color: ${({ theme }) => theme.contentBackgroundColor};
    }
    .ant-timeline-item-tail {
        border-left: 2px solid ${({ theme }) => theme.secondaryContentBackgroundColor};
    }
`


export class WorkTimeline extends Component {
    render() {
        return (
            <StyledTimeline>
                <Timeline.Item color={this.props.theme.infoColor}>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item color={this.props.theme.warningColor}>Solve initial networkTimeline problems 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item color={this.props.theme.errorColor}>NetworkTimeline problems being solved 2015-09-01</Timeline.Item>
                <Timeline.Item color={this.props.theme.successColor}>Solve initial networkTimeline problems 2015-09-01</Timeline.Item>
            </StyledTimeline>
        );
    }
}

export default withTheme(WorkTimeline);
