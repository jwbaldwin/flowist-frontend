import React, { Component } from 'react';
import { Layout } from 'antd';
import './NotFound.scss';

const { Content } = Layout;

export class NotFound extends Component {
    componentDidMount() {
        document.title = this.props.title + " |  Flowist";
    }

    render() {
        return (
            <Content className="centered not-found" style={{ padding: 24}}>
                <div class="code-area">
                    <span style={{color: '#777', fontStyle: 'italic'}}>
                    // 404 page not found.
                    </span>
                    <span>
                        <span style={{color: '#d65562'}}>if </span>
                        (<span style={{color: '#4ca8ef'}}>!</span><span style={{fontStyle: 'italic', color:'#bdbdbd'}}>found</span>)
                    </span>
                    <span>
                        <span style={{paddingLeft: 15, color: '#2796ec'}}>
                        <i style={{width: 10, display:'inline-block'}}></i>throw
                        </span>
                        <span>
                        (<span style={{color: '#a6a61f'}}>"(╯°□°)╯︵ ┻━┻"</span>);
                        </span>
                        <span style={{display:'block'}}><span></span></span>
                        <span style={{color: '#777', fontStyle: 'italic'}}>
                        // <a href="/app">Go home!</a>
                        </span>
                    </span>
                </div>
            </Content>
        );
    }
}

export default NotFound;
