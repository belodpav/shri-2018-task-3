import React, { Component } from 'react';
import './Modal.css';
import ButtonContainer from '../../containers/ButtonContainer/ButtonContainer';

const ModalRemove = (props) => {

  return (
    <div className="modal">
    <div className="modal__window">
      <span className="modal__icon icon icon_type_girl-close"></span>
      <div className="modal__text">Встреча будет<br class="modal__br_touch_false" /> удалена безвозвратно</div>
      <div className="modal__buttons">
        <ButtonContainer onClick={props.onCancel} cls="modal__button">Отмена</ButtonContainer>
        <ButtonContainer onClick={props.onRemoveEvent} cls="modal__button">Удалить</ButtonContainer>
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
        <ButtonContainer onClick={props.onOk} theme="active" cls="modal__button">Хорошо</ButtonContainer>
      </div>
    </div>
  </div> 
  )
}

export { ModalRemove, ModalCreate };