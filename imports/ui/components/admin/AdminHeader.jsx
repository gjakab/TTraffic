import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';


class AdminHeader extends Component{
	toggleSidebar(event){
		var sidebar = $('#sidebar');
		var button = $('#menu-button');
		$('#sidebar').sidebar('toggle');
	}
	onMessageClose(event){
	   	$(event.target).closest('.message').transition('fade');
	}
	onLogout(){
		Meteor.logout(function(){
			browserHistory.push('/admin/login');
		});
	}
	render(){
		return(
			<div className="ui top large header ls-admin-header fixed menu transition visible pusher">
				<div className="ui container ls-container">
					<div className="left menu">
						<div  id="menu-button"  className="item ls-sidebar-button" >
							<div className="ls-menu-button" onClick={this.toggleSidebar}>
	                			<i className="fa fa-bars" aria-hidden="true"></i>
            				</div>
            			</div>
						<div className="item ls-logo-link-wrapper">
							<Link className="ls-logo-link" to="/">
								<div className="ls-logo-wrapper">
									<img className="ls-logo" src="/images/general/logo-placeholder.png"/>
								</div>
							</Link>
						</div>
						<div className="item">
							<Link to="/admin">
								<span className="ls-name">All</span>
							</Link>
						</div>
						<div className="item">
							<Link to="/admin/section/posted">
								<span className="ls-name">Posted</span>
							</Link>
						</div>
						<div className="item">
							<Link to="/admin/section/deleted">
								<span className="ls-name">Deleted</span>
							</Link>
						</div>
						<div className="item">
							<Link to="/admin/blogpost/new">
								<span className="ls-name">Blog</span>
							</Link>
						</div>
						<div className="item">
							<Link to="/admin/section/deals">
								<span className="ls-name">Deals</span>
							</Link>
						</div>
						<div className="item">
							<Link to="/admin/post/new">
								<span className="ls-name">Add post</span>
							</Link>
						</div>
						<div className="item">
							<Link to="/admin/user">
								<span className="ls-name">Add user</span>
							</Link>
						</div>
					</div>
					<div className="right menu">
						<div className="item">
							<div className="ui button" onClick={this.onLogout}>Log out</div>
						</div>
					</div>

					{/*Message*/}

					<div className="ui message ls-admin-message hidden" id="ls-admin-message">
					  	<i className="close icon" onClick={this.onMessageClose}></i>
					  	<div className="header" id="ls-message-title"></div>
						<p id="ls-message-text"></p>
					</div>

				</div>
			</div>
		);
	}
} 

export default AdminHeader;