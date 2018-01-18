import React, { Component } from 'react';
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

    console.log('hey');
 
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
    
    console.log(newValue);
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


export default TimePickerContainer;

function strTimeToMinutes(str) {
    if (str.length !== 5 || str[2] !== ':') return NaN;
    
    const list = str.split(':');
    let hour = +list[0];
    let minutes = hour*60 + +list[1];
    
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