import React, { Component } from 'react';
import { Timeline, Icon } from 'antd';
import styled, { withTheme } from 'styled-components';
import moment from "moment"

const StyledTimeline = styled(Timeline)`
    color: ${({ theme }) => theme.defaultText};
    margin: 2em !important;
    text-align: left;
    .ant-timeline-item-head-custom {
        background-color: ${({ theme }) => theme.content};
    }
    .ant-timeline-item-head {
        background-color: ${({ theme }) => theme.content};
    }
    .ant-timeline-item-tail {
        border-left: 2px solid ${({ theme }) => theme.header};
    }
`

export class WorkTimeline extends Component {

    getColor(type) {
        switch (type) {
            case 'update':
                return this.props.theme.infoColor;
            case 'info':
                return this.props.theme.header;
            case 'complete':
                return this.props.theme.successColor;
            case 'error':
                return this.props.theme.errorColor;
            case 'warning':
                return this.props.theme.warningColor;
            default:
                return this.props.theme.infoColor;
        }
    }

    render() {
        return (
            <StyledTimeline>
                {this.props.logs.map((log, key) =>
                    <Timeline.Item key={key} color={this.getColor(log.type)}>
                     {log.data} - {<span style={{color: this.props.theme.header}}>{moment().to(log.created)}</span>}
                    </Timeline.Item>
                )}
            </StyledTimeline>
        );
    }
}

export default withTheme(WorkTimeline);
