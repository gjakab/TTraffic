import React, {Component} from 'react';
import { Link } from 'react-router'

class AdminFooter extends Component{
	render(){
		return(
			<div className="ls-admin-footer">
				<ul className="ls-admin-footer-inner">
					<li className="ls-admin-footer-table-cell">
						<Link to="/" className="ls-admin-footer-text">
							Home
						</Link>
					</li>
					<li className="ls-admin-footer-table-cell">
						<Link to="/" className="ls-admin-footer-text">
							Contuct Us
						</Link>
					</li>
					<li className="ls-admin-footer-table-cell">
						<Link to="/" className="ls-admin-footer-text">
							Sitemap
						</Link>
					</li>
					<li className="ls-admin-footer-table-cell">
						<Link to="/" className="ls-admin-footer-text">
							Privacy Policy
						</Link>
					</li>
					<li className="ls-admin-footer-table-cell">
						<span className="ls-admin-footer-text">
							Copyright &copy; 2016: NewsTracker.com
						</span>
					</li>
				</ul>
			</div>
		);
	}
} 

export default AdminFooter;