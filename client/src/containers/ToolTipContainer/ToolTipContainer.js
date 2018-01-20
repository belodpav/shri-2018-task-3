import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toolTipActions from './../../actions/ToolTipActions';
import * as pageActions from './../../actions/PageActions';
import ToolTip from '../../components/ToolTip/ToolTip';

class ToolTipContainer extends Component {
  handleOnEditClick = () => {
    const { openChangeEventPage } = this.props.pageActions;
    const { hideToolTip } = this.props.toolTipActions;
    
    openChangeEventPage();
    hideToolTip();
  };

  generateMemberCountStr(number) {  
    const cases = [2, 0, 1, 1, 1, 2];  
    const titles = ['участник', 'участника', 'участников']
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
  }

  render() {
    let className = 'tooltip';
    let { top, left } = this.props.tooltip;
    let triangleTop = 0;
    let triangleLeft = '50%';
    const { cls, style, styleTriangle, event } = this.props;
    let membersCountStr;
    const { handleOnEditClick, generateMemberCountStr } = this;

    className += cls ? ' ' + cls : '';

    if (event.users.length > 1) {
      membersCountStr = (event.users.length - 1) + ' ' + generateMemberCountStr(event.users.length - 1);
    }
    return (
      <ToolTip
        className={className}
        onEditClick={handleOnEditClick}
        event={event}
        style={style}
        styleTriangle={styleTriangle}
        membersCountStr={membersCountStr}
      />
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
export default connect(mapStateToProps, mapDispatchToProps)(ToolTipContainer);