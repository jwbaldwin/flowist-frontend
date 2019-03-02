import React, { Component } from 'react';
import { Button, Icon, Empty } from 'antd';
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
				<Empty
					// image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
					description={
						<div style={{ color: '#bbb', marginBottom: '3em' }}>
							No active flows. Add one here!
							<span>
								<br />
								<Icon type="bulb" /> Tip: use `⌘ + S`
							</span>
						</div>
					}
				>
					<Button icon="thunderbolt" size="large" type="primary" onClick={this.showModal}>
						Add Flow!
					</Button>
				</Empty>
			</div>
		);
	}
}

export default EmptyHome;
