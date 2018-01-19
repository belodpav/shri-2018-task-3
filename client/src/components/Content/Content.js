import React, { Component } from 'react';
import './Content.css';
import LoaderIndicator from '../LoaderIndicator/LoaderIndicator'


const Content = (props) => {
	const {
		className,
		contentFloorItems,
		fetching
	} = props;

	return (
		<div className={className} >
			{contentFloorItems}
			{ fetching ?
				<div className="content__loader-box">
					<LoaderIndicator />
				</div> : ""
			}
		</div>
	);	
}

export default Content;