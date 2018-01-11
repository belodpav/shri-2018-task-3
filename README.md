### Установка зависимостей
Установка для серверной части
 ```
 npm install
 ```
 Установка для клиентской части
 ```
 cd client && npm install
 ```

### Запуск
Запуск приложения.(Одновременный запуск сервера и клиентской части) 
 ```
 npm run dev-app
 ```
 Запуск только сервера:
 ```
 npm run server
 ```
  Запуск только клиента:
 ```
 npm run client
 ```

### О используемых технологиях
Серверная часть приложения строится c использованием следующих библиотек:

* Express
* Sequelize
* GraphQL

Клиентская часть приложения построена на:
 * Redux
 * React
 
 Также при построеннии клиентской части приложения использовались библиотеки:
* moment.js

Сторонние React компоненты:

* [react-dates](https://github.com/airbnb/react-dates)
* [react-autosuggest](https://github.com/moroshko/react-autosuggest)
* [time-picker](https://github.com/react-component/time-picker)
