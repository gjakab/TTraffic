import React, {Component} from 'react';
import update from 'react-addons-update';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import { removeUser } from '../../../../api/users/methods';
import AdminSingleUser from './AdminSingleUser';


class AdminUser extends Component{
	closeErrorMesageHandler(event){
		$(event.target)
		    .closest('.message')
		    .transition('fade');
	}
	onUserRemove(user){
		$(this.refs.dimmer).dimmer('show');
		if(removeUser.call(user._id)){
			$(this.refs.dimmer).dimmer('show');
		};
	}
	renderUsers(){
		let self = this;
		if(this.props.users.length){
			return this.props.users.map((user,index)=>{
				return <AdminSingleUser key={index} user={user} onUserRemove={this.onUserRemove.bind(this)}/>;
			});
		}
		else{
			return <tr className="ls-user">
			 	<td className="ls-user-main">
			 		<div className="ls-user-main-inner">
						No users found
					</div>
				</td>
			</tr>	
		}
	}
	render(){
		return(
			<div className="ls-admin-user">
				<div className="ls-title">
					<h2 className="ui header">
					  	<i className="users icon"></i>
					  	<div className="content">
						    Users
					  	</div>
					</h2>
				</div>

				<div className="ls-add-user-wrapper">
					<Link className="ui primary labeled icon button" to="/admin/user/new">
					  	<i className="add user icon"></i>
					  	Add user
					</Link>
				</div>
				
				<table className="ui grey celled table ls-user-table">
					<thead>
						<tr>
							<th>Usename</th>
							<th className="collapsing">Remove user</th>
						</tr>
					</thead>
					<tbody>
						{this.renderUsers()}
					</tbody>
			    </table>
			    <div class="ui blurring segment">
					<div ref="dimmer" className="ui page inverted dimmer">
						<div className="content">
						    <div className="center">
						    	<h2 className="ui icon header">
							  		<i className="remove user icon"></i>
								  	<div className="content">
									    User removed
								  	</div>
								</h2>
						    </div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default createContainer(({params}) => {
	Meteor.subscribe('users');
  	return {
    	users: Meteor.users.find({
    		profile: {
    			access:'user'
    		}
    	}).fetch()
    }
}, AdminUser);
