import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import { Link, browserHistory } from 'react-router'


class AdminLogin extends Component{
	closeErrorMesageHandler(event){
		$(event.target)
		    .closest('.message')
		    .transition('fade');
	}
	componentDidMount(){
		var settings={
			inline : true,
		    on     : 'blur',
		    onSuccess(event, fields){
		    	Meteor.loginWithPassword(fields.username, fields.password, function(error){
		    		if(error){
		    			$('#error-message').removeClass('hidden');
		    			return false;
		    		}
		    		else{
		    			browserHistory.push('/admin');
		    			return false;
		    		}
		    	})
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
				}
			},
    	};

		$('#login-form')
			.form(settings);
	}
	render(){
		return (
			<div className="ls-admin-login">
				<div className="ui container">
					
					<form id="login-form" className="ui form" >
						<Link className="ls-logo-link" to="/">
							<div className="ls-logo-wrapper">
								<img className="ls-logo" src="/images/general/logo-placeholder.png"/>
							</div>
						</Link>

						<div id="error-message" className="ui hidden negative message">
							<i className="close icon" onClick={this.closeErrorMesageHandler.bind(this)}></i>
								<div className="header">
									Login failed
								</div>
							<p>Username or password is not correct</p>
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
						<button className="ui button primary" type="submit">Submit</button>
					</form>
				</div>
			</div>
		);
	}
};

export default AdminLogin;

