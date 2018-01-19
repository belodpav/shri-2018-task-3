import React, { Component } from 'react';
import './ToolTip.css';

import { Person } from '../Person/Person';
import CircleButtonContainer from '../../containers/CircleButtonContainer/CircleButtonContainer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as toolTipActions from './../../actions/ToolTipActions';
import * as pageActions from './../../actions/PageActions';

class ToolTip extends Component {
  handleEditClick() {
    const { openChangeEventPage } = this.props.pageActions;
    const { hideToolTip } = this.props.toolTipActions;
    
    openChangeEventPage();
    hideToolTip();
  }
  render() {
    let { top, left } = this.props.tooltip;

    let triangleTop = 0;
    let triangleLeft = '50%';
    let style = this.props.style;

    

    const event = this.props.event;
    
    const membersCount = event.users.length;

   return (
    <div  ref={(box) => {this.tooltip = box}} className={"tooltip " + this.props.className} style={style}>
      <span className="tooltip__triangle" style={this.props.styleTriangle} />
      <CircleButtonContainer 
        cls="tooltip__edit"
        hasIcon={true}
        iconType="edit"
        onClick={this.handleEditClick.bind(this)}
      />
      <div className="tooltip__title">
              { event.title }
            </div>
            <div className="tooltip__info">
              <span className="tooltip__date">{event.dateStart.format('D MMMM')}</span>
              <span className="tooltip__time-range">
              ,&nbsp;{event.dateStart.format('HH:mm')}&mdash;{event.dateEnd.format('HH:mm')}&nbsp;&middot;&nbsp;</span>
              <span className="tooltip__room">{event.room.title}</span>
            </div>
            <div className="tooltip__people">
              <Person name={event.users[0].login} avatarUrl={event.users[0].avatarUrl} />
              {membersCount - 1 > 0 ?
                <div className="tooltip__people-count">&nbsp;и { membersCount - 1} участников</div>
                : ""
              }
            </div>
    </div>
   );  
  }
 
};

function mapStateToProps (state) {
  return {
    tooltip: state.tooltip
  }
}
function mapDispatchToProps(dispatch) {
  return {
    toolTipActions: bindActionCreators(toolTipActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToolTip);

