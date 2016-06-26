import React, {Component} from 'react';

class AdminHeader extends Component{
	render(){
		return(
			<div className="ls-admin-home">
				{this.props.children}
			</div>
		);
	}
} 

export default AdminHeader;