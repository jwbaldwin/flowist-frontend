import React, { Component } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import FlowItem from '../FlowItem';
import './FlowHome.css';

export class Settings extends Component {
	render() {
		return (
            <div>
                <TransitionGroup className="flow-home">
                     <CSSTransition
                        key={1}
                        timeout={500}
                        classNames="fade"
                        >
			            <FlowItem />
                    </CSSTransition>
                </TransitionGroup>
            </div>
		);
	}
}

export default Settings;