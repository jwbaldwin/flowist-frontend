import React, { Component } from 'react';
import { Empty } from 'antd';

export class ArchiveEmpty extends Component {

	render() {
		return (
			<div>
				<Empty
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