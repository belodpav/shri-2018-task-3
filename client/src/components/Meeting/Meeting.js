import React, { Component } from 'react';
import './Meeting.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toolTipActions from './../../actions/ToolTipActions';
import * as eventActions from './../../actions/EventActions';

class Meeting extends Component {
  handleClick() {
    
    const meetingBox = this.box; 
    //this.props.toolTipActions.showToolTip();
    let top = this.box.getBoundingClientRect().bottom;
    let left = this.box.getBoundingClientRect().left + this.box.offsetWidth / 2;
    let classN = 'tooltip_pos_bottom';

    let triangleLeft = '50%';

    const viewPortHeight = window.innerHeight;
    const viewPortWidth = window.innerWidth;
    if (viewPortWidth >= 1280) {
      if (top + 113 >= viewPortHeight) {
        top -=113 + meetingBox.offsetHeight;
        classN = 'tooltip_pos_top';
      }
      if (left + 338 / 2 >= viewPortWidth) {
        left = viewPortWidth - 338/2 - (1.9*viewPortWidth/100 );
        triangleLeft = 'calc(50% + ' + (338/2 - this.box.offsetWidth / 2) + 'px)';
      }
    } else {
      left = viewPortWidth / 2;
      if (top + 140 >= viewPortHeight) {
        top -=140 + meetingBox.offsetHeight;
        classN = 'tooltip_pos_top';
      }
      let leftPos = this.box.getBoundingClientRect().left < 0 ? 0 : this.box.getBoundingClientRect().left;
      let rightPos = this.box.getBoundingClientRect().right > viewPortWidth ? viewPortWidth : this.box.getBoundingClientRect().right;
      let width = rightPos - leftPos;
      
      if (viewPortWidth / 2 > rightPos) {
        let middle = rightPos - width / 2;
       
        if (leftPos > 0) {
            triangleLeft =  middle + 'px';
        } else {
            triangleLeft = '15px';
        } 
      } else {
        let middle = leftPos + width / 2;
       
        if (rightPos <= viewPortWidth) {
            triangleLeft =  middle + 'px';
        } else {
            triangleLeft = 'calc(100% - 15px)';
        } 
      }


    }
    
    
    const data = {
      top: top + 'px',
      left: left + 'px',
      triangleLeft: triangleLeft,
      classN: classN
    };
    /*if (this.props.tooltip.isActive) {
      this.props.toolTipActions.hideToolTip();
    }*/
    
    this.props.toolTipActions.setToolTipCoord(data);
    this.props.eventActions.setActiveEvent(this.props.event);
    setTimeout( () => { this.props.toolTipActions.showToolTip()}, 50);
  }
  render() {
    const activeEvent = this.props.storeEvents.activeEvent;
    const isActiveTooltip = this.props.tooltip.isActive;
    const isActive = (isActiveTooltip && activeEvent.id === this.props.event.id) ? true : false;

    return (
      <div 
        ref={(box) => {this.box = box}} 
        className={"meeting" + (isActive ? " meeting_state_active": "")}  
        onClick={this.handleClick.bind(this)} 
        style={{width: this.props.width}}>
      </div>
    );
  }
	
}

function mapStateToProps (state) {
  return {
    tooltip: state.tooltip,
    storeEvents: state.events
  }
}
function mapDispatchToProps(dispatch) {
  return {
    toolTipActions: bindActionCreators(toolTipActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Meeting);