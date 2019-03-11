import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as flowActions from '../../actions/flowActions';
import { Badge, Skeleton, Card, Icon, Typography } from 'antd';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import { stateFromMarkdown } from "draft-js-import-markdown";
import './FlowItem.css';
import FlowTagsFooter from './FlowTagsFooter';
import 'draft-js-hashtag-plugin/lib/plugin.css';

const { Title } = Typography;

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const markdownPlugin = createMarkdownShortcutsPlugin();

const plugins = [
    linkifyPlugin,
    hashtagPlugin,
    markdownPlugin,
];

const iconMap = {
	coding: 'laptop',
	researching: 'search',
	debugging: 'alert',
    planning: 'schedule'
};

const contentStyle = {
  width: '100%',
  textAlign: 'left',
};

const tagsFooterStyle = {
  width: '80%',
  textAlign: 'left',
};

const timestampStyle = {
  width: '20%',
  textAlign: 'right',
  justify: 'bottom',
};

class FlowItem extends Component {

    focus = () => {
        this.editor.focus();
    };

    getFlowStatusIcon = (flowStatus) => {
        switch(flowStatus) {
            case 'ACTIVE':
                return  <Badge status="processing"/>
            case 'PAUSED':
                return  <Badge status="warning" />
            case 'COMPLETED':
                return  <Badge status="success" />
        }
    }

	render() {
		const { flow } = this.props;
		const created= new Date(flow.created);

		return (
			<Card
				actions={[
                    <Icon type="delete" onClick={this.props.flowActions.deleteFlow(flow.id)} theme="twoTone" twoToneColor="#f5222d" style={{fontSize: 18}}/>,
                    <Icon type="ellipsis" style={{fontSize: 18}}/>,
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{fontSize: 18}}/>
                  ]}
				extra={this.getFlowStatusIcon(flow.flowStatus)}
				title={<span><Icon type={iconMap[flow.activity]} id="flow-activity-icon"/> {flow.title} </span>}
			>
				<Skeleton loading={this.props.isLoading} avatar title paragraph={{ rows: 4 }} active>
					<Card.Grid style={contentStyle} className="flow-card-content">
                        <div className='editor' id='editor-content' onClick={this.focus}>
                            <Editor
                                editorState={EditorState.createWithContent(stateFromMarkdown(flow.content))}
                                onChange={this.onChange}
                                plugins={plugins}
                                ref={(element) => { this.editor = element; }}
                            />
                        </div>
                    </Card.Grid>
                    <Card.Grid style={tagsFooterStyle} className="flow-card-tags">
                        <FlowTagsFooter tags={flow.tags} />
                    </Card.Grid>
                    <Card.Grid style={timestampStyle} className="flow-card-timestamp">
                        { created.toDateString().toLocaleLowerCase() }
                    </Card.Grid>
				</Skeleton>
			</Card>
		);
	}
}

FlowItem.propTypes = {
	flowActions: PropTypes.object,
	flow: PropTypes.object,
	isLoading: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		flow: state.flow.data,
		isLoading: state.flow.isLoading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		flowActions: bindActionCreators(flowActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowItem);
