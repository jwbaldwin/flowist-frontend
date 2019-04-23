import React, { Component } from 'react';
import { Button, Icon, Empty, Tag } from 'antd';
import FlowModal from '../../FlowModal';
import './EmptyHome.scss';

export class EmptyHome extends Component {
	state = {
		visible: false
	};

    componentWillMount() {
		this.addKeybindListener();
	}

	handleKeyPress = (event) => {
        event.preventDefault();
        if(event.key === 'f') {
            this.showModal();
        } else if (event.ctrlKey && event.key === 's') {
            this.showModal();
        }
    };

	showModal = () => {
        document.removeEventListener('keydown', this.handleKeyPress);
		this.setState({ visible: !this.state.visible });
	};

    addKeybindListener = () => {
        document.addEventListener('keydown', this.handleKeyPress);
    }

	render() {
		return (
			<div>
				<FlowModal visible={this.state.visible} type="create" addKeybindListener={this.addKeybindListener}/>
				<Empty
                    image={<Icon type="coffee" style={{fontSize: 64, color: "#ccc"}}/>}
					description={
						<span style={{ color: '#bbb', marginBottom: '3em' }}>
							No active flows. Add one here!
							<span>
								<br />
								<Icon type="bulb" /> <strong>Tip:</strong> use <Tag>⌘ + s</Tag> or simply <Tag>f</Tag> to save a flow
							</span>
						</span>
					}
				>
					<Button icon="thunderbolt" size="large" type="primary" onClick={this.showModal} style={{ boxShadow: '0 2px 4px 0 rgba(62,80,104,0.32)'}}>
						Add Flow!
					</Button>
				</Empty>
			</div>
		);
	}
}

export default EmptyHome;
