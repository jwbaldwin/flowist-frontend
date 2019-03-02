import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import FlowModal from '../FlowModal';

export class EmptyHome extends Component {
		state = {
			visible: false
		};

	showModal = () => {
		this.setState({ visible: !this.state.visible });
	};
 // TODO USE EMPTY ANTD TAG
	render() {
		return (
			<div>
				<FlowModal visible={this.state.visible} /> 
				<div style={{ color: '#bbb', marginBottom: '3em' }}>
					No active flows. Add one here!
					<span>
						<br />
						<Icon type="bulb" /> Tip: use `⌘ + S`
					</span>
				</div>
				<div>
					<Button icon="thunderbolt" size="large" type="primary" onClick={this.showModal}>
						Quick Flow!
					</Button>
				</div>
			</div>
		);
	}
}

export default EmptyHome;
