import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

class AdminAddUser extends Component{
	closeErrorMesageHandler(event){
		$(event.target)
		    .closest('.message')
		    .transition('fade');
	}
	componentDidMount(){

		let self = this;

		var settings={
			inline : true,
		    on     : 'blur',
		    onSuccess(event, fields){
		    	let options = {
		    		username:fields.username,
		    		password:fields.password,
		    		profile:{
		    			access:'user'
		    		}
		    	};
		    	Accounts.createUser(options, function(error){
		    		if(error){
		    			$(self.refs.errorReason).html(error.reason);
		    			$(self.refs.errorMessage).removeClass('hidden');
		    			return false;
		    		}
		    		else{
		    			$(self.refs.dimmer).dimmer('show');
		    			setTimeout(function(){
		    				browserHistory.push('/admin');
		    			},1000);
		    			return false;
		    		}
		    	});
		    	return false;
		    },
		    onFailure(){
		        return false;
		    },
			fields:{
				username :{
					identifier: 'username',
					rules:[
						{
							type: 'empty',
							prompt: 'Please enter a username'
						}
					]
				},
				password : {
					identifier: 'password',
					rules:[
						{
							type:'empty',
							prompt : 'Please enter a password'
						}, 
						{
							type: 'minLength[5]',
							prompt : 'Your password must be at least 5 characters'
						}
					]
				},
				password : {
					identifier: 'repassword',
					rules:[
						{
							type:'empty',
							prompt : 'Please enter a password'
						}, 
						{
							type: 'minLength[5]',
							prompt : 'Your password must be at least 5 characters'
						},
						{
							type: 'match[password]',
							prompt : 'Should be same as password'
						}
					]
				}
			},
    	};

		$('#login-form')
			.form(settings);
	}
	closeErrorMesageHandler(event){
		$(event.target)
		    .closest('.message')
		    .transition('fade');
	}
	render(){
		return(
			<div className="ls-admin-add-user">
				<div className="ls-admin-add-user-inner">
					<div className="ui container">
						<form id="login-form" className="ui form" >
							<h2 className="ls-title ui icon header">
							  	<i className="add user icon"></i>
							  	<div className="content">
							    	Add user
							  	</div>
							</h2>
							<div ref="errorMessage" className="ui hidden negative message">
								<i className="close icon" onClick={this.closeErrorMesageHandler.bind(this)}></i>
									<div className="header">
										Failed to add new user
									</div>
								<p ref="errorReason"></p>
							</div>
							<div className="field">
							    <label>Username</label>
								<div className="ui left icon input">
									<i className="user icon"></i>
									<input type="text" name="username" placeholder="Username"/>
								</div>
							</div>
							<div className="field">
							    <label>Password</label>
								<div className="ui left icon input">
									<i className="lock icon"></i>
									<input type="password" name="password" placeholder="Password"/>
								</div>
							</div>
							<div className="field">
							    <label>Repeat password</label>
								<div className="ui left icon input">
									<i className="repeat icon"></i>
									<input type="password" name="repassword" placeholder="Repeat password"/>
								</div>
							</div>
							<div className="ls-buttons">
								<div className="ui buttons">
								  	<Link to='/admin' className="ui button">Cancel</Link>
								  	<div className="or"></div>
								  	<button className="ui button primary" type="submit">Add</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="ui blurring segment">
					<div ref="dimmer" className="ui page inverted dimmer">
						<div className="content">
						    <div className="center">
						    	<h2 className="ui icon header">
								  	<i className="add user icon"></i>
								  	<div className="content">
									    User added
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

export default AdminAddUser;