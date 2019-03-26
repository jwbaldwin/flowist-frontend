import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Menu, Icon } from 'antd';
import logo from '../../images/flowist.png';

const { Content } = Layout;

const mainStyle = {
    width: '100vw',
    height: '100vh',
    background: '-webkit-linear-gradient(-45deg, #fe5196, #e6328c, #e6328c)',
    background: '-o-linear-gradient(-45deg, #fe5196, #e6328c, #e6328c)',
    background: '-moz-linear-gradient(-45deg, #fe5196, #e6328c, #e6328c)',
    background: 'linear-gradient(-45deg, #fe5196, #e6328c, #e6328c)',
}

const textStyle = {
    height: '100vh',
}

export class ComingSoon extends Component {
    render() {
        return (
            <Content style={mainStyle}>
                <Menu
                    style={{ background: 'rgba(255,255,255,0.05)', width: '100vw' }}
                    mode="horizontal"
                >
                    <Menu.Item key="app" style={{ float: 'right', color: '#fff' }}>
                        <Link to="/app" style={{ color: '#fff' }}>
                            <Icon type='login' />App
                        </Link>
                    </Menu.Item>
                </Menu>

                <div className='centered' style={{ display: 'block', marginTop: '35vh' }}>
                    <h3 style={{
                        fontSize: '50px',
                        fontWeight: '800',
                        color: '#fff',
                        lineHeight: '1.2',
                        textTransform: ' uppercase',
                    }}>COMING SOON</h3>
                    <p style={{
                        fontSize: '30px',
                        fontWeight: '200',
                        color: '#fff',
                        lineHeight: '1.2',
                    }}>Our website is under construction!</p>
                    <Link to="/app">
                        <Button size='large' icon='rocket' type="primary" style={{ boxShadow: 'rgba(0, 21, 41, 0.25) 0px 1px 4px' }}>
                            Checkout the Development
                        </Button>
                    </Link>
                </div>
            </Content >
        );
    }
}

export default ComingSoon;