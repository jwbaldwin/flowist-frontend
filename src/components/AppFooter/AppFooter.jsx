import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';

const { Footer } = Layout;

const githubLink = "https://github.com/jwbaldwin/flowist";

export class AppFooter extends Component {

	render() {
		return (
		 <Footer style={{ textAlign: 'center'}}>
            <div>
                <a href={githubLink} style={{color: 'inherit'}}>
                    <Icon type='github' />
                </a>
            </div>
            <div>Flowist ©2019 Created by James Baldwin</div>
         </Footer>
		);
	}
}

export default withRouter(AppFooter);
