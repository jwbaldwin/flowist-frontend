import React, { Component } from 'react';
import { Empty } from 'antd';

export class ArchiveEmpty extends Component {

	render() {
		return (
			<div className="centered" style={{height: '100%'}}>
				<Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={
						<span style={{ color: '#bbb', marginBottom: '3em' }}>
							No archived flows!
						</span>
					}
				>
				</Empty>
			</div>
		);
	}
}

export default ArchiveEmpty;
