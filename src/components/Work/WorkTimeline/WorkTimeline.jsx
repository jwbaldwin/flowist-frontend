import React, { Component } from 'react';
import { Timeline, Icon } from 'antd';
import styled, { withTheme } from 'styled-components';

const StyledTimeline = styled(Timeline)`
    color: ${({ theme }) => theme.textColor};
    margin: 2em !important;
    text-align: left;
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
                {this.props.logs.map((log, key) =>
                    <Timeline.Item key={key} color={this.props.theme.infoColor}>{log}</Timeline.Item>
                )}
            </StyledTimeline>
        );
    }
}

export default withTheme(WorkTimeline);
