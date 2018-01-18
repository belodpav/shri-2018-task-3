import React, { Component } from 'react';

import './Content.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Floor from '../Floor/Floor';
import LoaderIndicator from '../LoaderIndicator/LoaderIndicator'

import * as diagramActions from './../../actions/DiagramActions';

import moment from 'moment';


class Content extends Component {
	render() {

		const { floors, roomsByFloor } = this.props.rooms;
		const { className } = this.props;
		const { fetching } = this.props.events;

		return (
			<div className={className} >
				{ 
					floors.map( floor => {
						return <Floor key={floor} number={floor} rooms={roomsByFloor[floor]} />
					})	
				}
				{
					fetching ?
						<div className="content__loader-box">
							<LoaderIndicator />
						</div> : ""
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