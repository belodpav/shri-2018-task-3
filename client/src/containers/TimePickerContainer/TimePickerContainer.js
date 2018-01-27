import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimePicker from '../../components/TimePicker/TimePicker';

class TimePickerContainer extends Component {
  
  constructor(props) {
    super(props);

    const { value } = this.props;

    let initState = {
      value: value
    };

    this.state = initState;
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      value: value
    });
 
  };
    
  handleBlur = () => {
    const value = this.state.value;
    const { onChange, minTime, maxTime } = this.props;
    let newValue;
    
    if (isValidTimeRange(minTime, maxTime ,value)) {
      newValue = value    
    } else {
      newValue = this.props.value;
    }
    
    this.setState({
      value: newValue
    });
    
    onChange(newValue);
  };
  
  handleClick = () => {
      //For future additions  
  };
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    this.setState({
      value: value
    });
  }

  render() {
    let className = 'timepicker';
    const { value } = this.state;
    const { cls } = this.props;
    const { handleChange, handleBlur } = this;

    className += cls ? ' ' + cls : ''; 

    return (
      <TimePicker
        className={className}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        onClear={()=>{}}
      />
    );
  }
}

TimePickerContainer.propTypes = {
  cls: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  minTime: PropTypes.string,
  maxTime: PropTypes.string
};

export default TimePickerContainer;

function strTimeToMinutes(str) {
    if (str.length !== 5 || str[2] !== ':') return NaN;
    
    const list = str.split(':');
    const firstN = +list[0];
    const secondN = +list[1];

    if (firstN < 0 || firstN > 23) return NaN;
    if (secondN < 0 || secondN > 59) return NaN;

    let hour = firstN;
    let minutes = hour*60 + secondN;
    
    return minutes;
}

function isValidTimeRange(min, max, str) {
    const minTime = strTimeToMinutes(min);
    const maxTime = strTimeToMinutes(max);
    const activeTime = strTimeToMinutes(str);
    
    if (!activeTime) return false; 
    
    if (activeTime >= minTime && activeTime <= maxTime) {
        return true;
    }
    return false;
}