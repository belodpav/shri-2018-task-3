const { models } = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  event (root, { id }) {
    return models.Event.findById(id);
  },
  events (root, args, context) {
    return models.Event.findAll({}, context);
  },
  eventsByDateRange (root, {dateStart, dateEnd}) {
    return models.Event.findAll({
      where: {
        dateStart: {
          [Op.lte]: dateEnd,
          [Op.gte]: dateStart
        }
      }
    });
  },
  user (root, { id }) {
    return models.User.findById(id);
  },
  users (root, args, context) {
    return models.User.findAll({}, context);
  },
  room (root, { id }) {
    return models.Room.findById(id);
  },
  rooms (root, args, context) {
    return models.Room.findAll({}, context);
  }
};
