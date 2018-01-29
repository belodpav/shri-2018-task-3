import React from 'react';
import TextInputContainer from '../../containers/TextInputContainer/TextInputContainer';

const TimePicker = (props) => {
  const {
    className,
    value,
    onChange,
    onBlur
  } = props;

  return (
    <div className={className}>
      <TextInputContainer
        text={value}
        onBlur={onBlur}
        onChange={onChange}
        hasClear={false}
      />
    </div>
  );
}


export default TimePicker;