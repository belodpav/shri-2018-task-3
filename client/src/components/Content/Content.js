import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Floor from '../Floor/Floor';

import * as diagramActions from './../../actions/DiagramActions';

import moment from 'moment';


class Content extends Component {
	render() {

		const { floors, roomsByFloor } = this.props.rooms;
		const {className} = this.props;

		return (
			<div className={className} >
				{ 
					floors.map( floor => {
						return <Floor key={floor} number={floor} rooms={roomsByFloor[floor]} />
					})	
				}
			</div>
		);	
	}
}

function mapStateToProps (state) {
  return {
    rooms: state.rooms,
    events: state.events
  }
}
function mapDispatchToProps(dispatch) {
	return {
		diagramActions: bindActionCreators(diagramActions, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);