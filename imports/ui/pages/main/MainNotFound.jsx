import React,{ Component } from 'react';

class MainNotFound extends Component{
	render(){
		return(
			<div className="ls-main-not-found">
				<div className="ls-main-not-found-inner">
					<h2 className="ui icon header">
						<i className="warning sign icon"></i>
						<div className="content">
						    404
						    <div className="sub header">Page not found</div>
						</div>
					</h2>
				</div>
			</div>
		);
	}
} 

export default MainNotFound;