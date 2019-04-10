import React, { Component } from 'react';
import { Button, Icon } from 'antd';


export class Github extends Component {
	render() {
		return (
            <Button type="default" block>
				<Icon type="github" />Login with Github
			</Button>
		);
	}
}

export default Github;
