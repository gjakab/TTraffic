import React, {Component} from 'react';


class AdminSingleUser extends Component{
	render(){
		return(
			<tr className="ls-user">
			 	<td className="ls-user-main">
			 		<div className="ls-user-main-inner">
						{this.props.user.username}
					</div>
				</td>
				<td className="ls-user-buttons warning center aligned selectable" onClick={this.props.onUserRemove.bind(this, this.props.user)}>
					<i className="remove icon ls-remove-button"></i>
				</td>
			</tr>	
		);
	}
}

export default AdminSingleUser;