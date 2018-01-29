import React from 'react';
import IconContainer from '../../containers/IconContainer/IconContainer';
import './CircleButton.css';

const CircleButton = (props) => {
	const {
		className,
		disabled,
		hasIcon,
		iconType,
		onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur } = props;

	return (
		<button
			className={className}
			disabled={disabled}
			onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onFocus={onFocus}
      onBlur={onBlur}
		>
			{hasIcon ? 
				<IconContainer
					cls="circle-button__icon"
					type={iconType}
				/> : ''}
		</button>
	);

};

export default CircleButton;
