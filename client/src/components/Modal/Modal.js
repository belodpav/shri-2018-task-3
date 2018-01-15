import React, { Component } from 'react';
import './Modal.css';

import Button from '../Button/Button';

const ModalRemove = (props) => {

  return (
    <div className="modal">
    <div className="modal__window">
      <span className="modal__icon icon icon_type_girl-close"></span>
      <div className="modal__text">Встреча будет удалена безвозвратно</div>
      <div className="modal__buttons">
        <Button onClick={props.onCancel} className="modal__button">Отмена</Button>
        <Button onClick={props.onRemoveEvent} className="modal__button">Удалить</Button>
      </div>
    </div>
  </div> 
  )
};

const ModalCreate = (props) => {

  return (
    <div className="modal">
    <div className="modal__window">
      <span className="modal__icon icon icon_type_party"></span>
      <div className="modal__text">Встреча создана!</div>
      <div className="modal__date">{props.date}, {props.timeRange}</div>
      <div className="modal__place">{props.roomTitle}&nbsp;&middot;&nbsp;{props.roomFloor} этаж</div>
      <div className="modal__buttons">
        <Button onClick={props.onOk} theme="active" className="modal__button">Хорошо</Button>
      </div>
    </div>
  </div> 
  )
}

export { ModalRemove, ModalCreate };