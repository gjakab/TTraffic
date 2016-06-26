import React,{ Component } from 'react';

class AdminNotFound extends Component{
	render(){
		return(
			<div className="ls-admin-not-found">
				<div className="ls-admin-not-found-inner">
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

export default AdminNotFound;