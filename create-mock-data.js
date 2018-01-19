const { models, sequelize } = require('./models');

function createData () {
  let usersPromise = models.User.bulkCreate([
    {
      login: 'Михаил Белов',
      avatarUrl: 'https://belodpav.ru/shri-assets/02m.jpg',
      homeFloor: 0
    },
    {
      login: 'Марина Скворцова',
      avatarUrl: 'https://belodpav.ru/shri-assets/01w.jpg',
      homeFloor: 3
    },
    {
      login: 'Василий Громов',
      avatarUrl: 'https://belodpav.ru/shri-assets/08m.jpg',
      homeFloor: 2
    },
    {
      login: 'Елена Пахомова',
      avatarUrl: 'https://belodpav.ru/shri-assets/06w.jpg',
      homeFloor: 3
    },
    {
      login: 'Павел Шилов',
      avatarUrl: 'https://belodpav.ru/shri-assets/10m.jpg',
      homeFloor: 0
    },
    {
      login: 'Жанна Кошелева',
      avatarUrl: 'https://belodpav.ru/shri-assets/09w.jpg',
      homeFloor: 1
    },
    {
      login: 'Глеб Рябов',
      avatarUrl: 'https://belodpav.ru/shri-assets/11m.jpg',
      homeFloor: 5
    },
    {
      login: 'Лилия Павлова',
      avatarUrl: 'https://belodpav.ru/shri-assets/16w.jpg',
      homeFloor: 4
    },
    {
      login: 'Валентин Кузнецов',
      avatarUrl: 'https://belodpav.ru/shri-assets/13m.jpg',
      homeFloor: 4
    },
    {
      login: 'Ирина Костина',
      avatarUrl: 'https://belodpav.ru/shri-assets/21w.jpg',
      homeFloor: 3
    },
    {
      login: 'Денис Муравьёв',
      avatarUrl: 'https://belodpav.ru/shri-assets/26m.jpg',
      homeFloor: 2
    }
  ]);

  let roomsPromise = models.Room.bulkCreate([
    {
      title: '404',
      capacity: 5,
      floor: 4
    },
    {
      title: 'Деньги',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Карты',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Ствола',
      capacity: 2,
      floor: 2
    },
    {
      title: '14',
      capacity: 6,
      floor: 3
    }
  ]);

  const HOUR = 60 * 60 * 1000;
  let now = new Date();
  let oneHourLater = new Date(now.getTime() + HOUR);
  let twoHoursLater = new Date(oneHourLater.getTime() + HOUR);
  let threeHoursLater = new Date(twoHoursLater.getTime() + HOUR);
  let fourHoursLater = new Date(threeHoursLater.getTime() + HOUR);

  let eventsPromise = models.Event.bulkCreate([
    {
      title: 'ШРИ 2018 - начало',
      dateStart: now,
      dateEnd: oneHourLater
    },
    {
      title: '👾 Хакатон 👾',
      dateStart: oneHourLater,
      dateEnd: twoHoursLater
    },
    {
      title: '🍨 Пробуем kefir.js',
      dateStart: threeHoursLater,
      dateEnd: fourHoursLater
    }
  ]);

  Promise.all([usersPromise, roomsPromise, eventsPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Room.findAll(),
      models.Event.findAll()
    ]))
    .then(function ([users, rooms, events]) {
      let promises = [];
      promises.push(events[0].setRoom(rooms[0]));
      promises.push(events[1].setRoom(rooms[1]));
      promises.push(events[2].setRoom(rooms[2]));

      promises.push(events[0].setUsers([users[0], users[1]]));
      promises.push(events[1].setUsers([users[1], users[2]]));
      promises.push(events[2].setUsers([users[0], users[2]]));

      return Promise.all(promises);
    });
}

sequelize.sync()
  .then(createData);
