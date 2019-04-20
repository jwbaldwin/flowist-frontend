import React, { Component } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const FloatingButtons = styled.div`
    position: fixed;
    right: 30px;
    bottom: 50px;
    z-index: 101;
`;

const AddFlowButton = styled(Button)`
    height: 50px !important;
    width: 50px !important;
`;

export default class AppFloatingButtons extends Component {
  render() {
    return (
      <FloatingButtons>
        <AddFlowButton type="primary" shape="circle" icon="coffee" size="large"/>
      </FloatingButtons>
    )
  }
}
