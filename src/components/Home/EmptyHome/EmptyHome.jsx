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

	render() {
		return (
			<div>
				<FlowModal visible={this.state.visible} />
				<Empty
                    image={<Icon type="coffee" style={{fontSize: 64, color: "#ccc"}}/>}
					description={
						<span style={{ color: '#bbb', marginBottom: '3em' }}>
							No active flows. Add one here!
							<span>
								<br />
								<Icon type="bulb" /> Tip: use `⌘ + S`
							</span>
						</span>
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
