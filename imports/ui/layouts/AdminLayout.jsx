import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes} from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminFooter from '../components/admin/AdminFooter';
import AdminSidebar from '../components/admin/AdminSidebar';


class AdminLayout extends Component{
	render(){
		return(
			<div className="ls-admin-layout">
				<div className="ls-admin-layout-inner ui container">
					<AdminHeader/>
					<div className="ls-admin-content content">{this.props.children}</div>
					<AdminFooter/>
				</div>
				<AdminSidebar/>				
			</div>
		)
	}
}

export default AdminLayout;

