 import React, { Component } from 'react';

 import { IconClose } from '../Icon/Icon';
 import './Input.css';

class InputText extends Component {
	constructor(props) {
		super(props);

		let initState = {};
		if (this.props.value) {
			initState.close = true;
		} else {
			initState.close = false;
		}


		this.state = initState;

		
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleChange(e) {
		if(e.target.value.length) {
			this.setState({close: true});
		} else {
			this.setState({close: false});
		}

		this.props.onChange(e.target.value);
	}
	handleClick() {
		console.log('clear');
		this.props.onChange('');
	}
	render() {
		return (
			<div className={"input input_size_md input_theme_normal" + (this.state.close ? " input_actions_true" : "") }>
				<input 
					type="text"
					className="input__control"
					placeholder={this.props.placeholder}
					onChange={this.handleChange}
					value={this.props.value}	
				/>
				<IconClose onClick={this.handleClick} className="input__clear" />
			</div>
		);
	}
}

export default InputText;