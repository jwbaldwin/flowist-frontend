import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Col } from 'antd';
import styled from 'styled-components';

const TitleBar = styled(Col)`
    height: 120px;
    position: relative;
    display: flex;
    align-items: center;
`;

const TitleText = styled.h1`
    color: ${({ theme }) => theme.brightText};
    padding: 0 8px;
    font-weight: 600 !important;
    font-size: 24px;
`

export class TitleContainer extends Component {

    parseLocation = (path) => {
        let name = path.substring(path.indexOf('/') + 1, path.length);
        if (name === 'app') { return 'Flows'}
        else { 
            name = name.replace('app/', '')
            return name.charAt(0).toUpperCase() + name.slice(1)
        }
    }

	render() {
        const location = this.parseLocation(this.props.location.pathname)
		return (
			<Col span={24}>
				<TitleBar xs={{ span: 24, offset: 0 }} lg={{ span: 17, offset: 7 }}>
                    <TitleText>{location}</TitleText>
                </TitleBar>
			</Col>
		);
	}
}

export default withRouter(TitleContainer);
