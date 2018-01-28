import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../../components/App/App';
import * as roomActions from './../../actions/RoomActions';
import moment from 'moment';
import 'moment/locale/ru.js';

moment.locale('ru');

class AppContainer extends Component {
  componentWillMount() {
    const { getRooms } = this.props.roomActions;
    const date = moment();
    // Setting up Time Ranges
    const startRange = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
    const endRange = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);

    // Fetching Rooms data from server
    getRooms({dateStart: startRange, dateEnd: endRange});
  }
  componentDidMount() {
    
    setTimeout( () => { 
      const welcomeWindow = document.getElementById('welcome');
      welcomeWindow.className +=' welcome_state_hidden';
    }, 1000);
  }

  checkErrorPattern(text) {
    switch(text) {

      case 'Failed to fetch':
        return 'Не удалось получить данные с сервера. Проверьте соединение с интернетом.';

      case 'Internal Server Error':
        return 'Внутрення ошибка сервера. Попробуйте обновить страницу через несколько минут.';

      default:
        return text
    }
    return text;
  }

  render() {
    const { page } = this.props.page;
    const { isFetched } = this.props.rooms;
    const { errorMessage } = this.props.rooms;
    let error = this.checkErrorPattern(errorMessage);

    return (
      <App
        page={page}
        isFetched={isFetched}
        errorMessage={error}
      />
    );

  }
}


function mapStateToProps (state) {
  return {
    page: state.page,
    rooms: state.rooms
  }
}
function mapDispatchToProps(dispatch) {
  return {
    roomActions: bindActionCreators(roomActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
