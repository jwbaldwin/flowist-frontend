import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Menu, Icon } from 'antd';

const { Content } = Layout;

const mainStyle = {
    height: '100vh',
    background: 'linear-gradient(-45deg, #40a9ff, #40a9ff, #40a9ff)',
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