import React, {Component} from 'react';
import { Link } from 'react-router';


class AdminSidebar extends Component{
	constructor(props){
		super(props);
		this.state={
			user:null
		}
	}
	render(){
		return(
			<div className="ui left demo vertical inverted sidebar labeled icon menu" id="sidebar">
				<Link className="item" to = "/admin">
					<i className="home icon"></i>
					Home
				</Link>
				<Link className="item" to = "/admin/post/new">
					<i className="add square icon"></i>
					Add post
				</Link>
				<Link className="item" to = "/admin/user">
					<i className="users icon"></i>
					Users
				</Link>
			</div>
		);
	}
} 

export default AdminSidebar;

