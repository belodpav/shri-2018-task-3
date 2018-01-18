import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../../components/App/App';
import * as roomActions from './../../actions/RoomActions';
import moment from 'moment';
import 'moment/locale/ru.js';

moment.locale('ru');

class AppContainer extends Component {

  componentDidMount() {
    const { getRooms } = this.props.roomActions;
    const date = moment();
    // Setting up Time Ranges
    const startRange = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
    const endRange = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);

    // Fetching Rooms data from server
    getRooms({dateStart: startRange, dateEnd: endRange});

    // App loaded. Let's remove welcome window
    setTimeout( () => { 
      const welcomeWindow = document.getElementById('welcome');
      welcomeWindow.className +=' welcome_state_hidden';
    }, 2000);
  }

  render() {
    const { page } = this.props.page;
    
    return (
      <App
        page={page}
      />
    );
  }
}


function mapStateToProps (state) {
  return {
    page: state.page
  }
}
function mapDispatchToProps(dispatch) {
  return {
    roomActions: bindActionCreators(roomActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
