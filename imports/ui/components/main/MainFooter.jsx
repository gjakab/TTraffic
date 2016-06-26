import React, {Component} from 'react';
import { Link } from 'react-router'

class MainFooter extends Component{
	render(){
		return(
			<div className="ls-main-footer">
				<ul className="ls-main-footer-inner">
					<li className="ls-main-footer-table-cell">
						<Link to="/" className="ls-main-footer-text">
							Home
						</Link>
					</li>
					<li className="ls-main-footer-table-cell">
						<Link to="/" className="ls-main-footer-text">
							Contuct Us
						</Link>
					</li>
					<li className="ls-main-footer-table-cell">
						<Link to="/" className="ls-main-footer-text">
							Sitemap
						</Link>
					</li>
					<li className="ls-main-footer-table-cell">
						<Link to="/" className="ls-main-footer-text">
							Privacy Policy
						</Link>
					</li>
					<li className="ls-main-footer-table-cell">
						<span className="ls-main-footer-text">
							Copyright &copy; 2016: NewsTracker.com
						</span>
					</li>
				</ul>
			</div>
		);
	}
} 

export default MainFooter;