import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Content from '../../components/Content/Content';
import Floor from '../../components/Floor/Floor';

class ContentContainer extends Component {

  getContentFloorItems(floors, roomsByFloor) {
    let contentFloorItems;

    contentFloorItems = floors.map( floor => {
      return (
        <Floor
          key={floor}
          number={floor}
          rooms={roomsByFloor[floor]}
        />
      );
    })

    return contentFloorItems;
  }

  render() {
    let className = 'content';
    let contentFloorItems;
    const { floors, roomsByFloor } = this.props.rooms;
    const { cls } = this.props;
    const { fetching } = this.props.events;
    const { getContentFloorItems } = this;

    className += ' ' + cls;

    contentFloorItems = getContentFloorItems(floors, roomsByFloor);

    return (
      <Content
        className={className}
        contentFloorItems={contentFloorItems}
        fetching={fetching}
      />
    );
  }
}


function mapStateToProps (state) {
  return {
    rooms: state.rooms,
    events: state.events
  }
}

export default connect(mapStateToProps)(ContentContainer);