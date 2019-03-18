import React, { Component } from 'react';
import { Empty } from 'antd';

export class ArchiveEmpty extends Component {

	render() {
		return (
			<div>
				<Empty
					description={
						<div style={{ color: '#bbb', marginBottom: '3em' }}>
							No archived flows!
						</div>
					}
				>
				</Empty>
			</div>
		);
	}
}

export default ArchiveEmpty;
