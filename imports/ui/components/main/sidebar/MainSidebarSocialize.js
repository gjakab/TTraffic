import React, {Component} from 'react';

class MainSidebarSocialize extends Component{
	render(){
		return(
			<div className="ls-main-socialize">
				<h1 className="ls-sidebar-title">Socialize</h1>
				<ul className="ls-socialize-wrapper">
					<li className="ls-socialize-item">
						<a className="ls-socialize-item-inner">
							<div className="ls-socialize-left-cell ls-facebook"><i className="fa fa-facebook" aria-hidden="true"></i></div>
							<div className="ls-socialize-right-cell">Facebook</div>
						</a>
					</li>
					<li className="ls-socialize-item">
						<a className="ls-socialize-item-inner">
							<div className="ls-socialize-left-cell ls-google"><i className="fa fa-instagram" aria-hidden="true"></i></div>
							<div className="ls-socialize-right-cell">Google+</div>
						</a>
					</li>
					<li className="ls-socialize-item">
						<a className="ls-socialize-item-inner">
							<div className="ls-socialize-left-cell ls-twitter"><i className="fa fa-google-plus" aria-hidden="true"></i></div>
							<div className="ls-socialize-right-cell">Twitter</div>
						</a>
					</li>
					<li className="ls-socialize-item">
						<a className="ls-socialize-item-inner">
							<div className="ls-socialize-left-cell ls-linkedin"><i className="fa fa-linkedin" aria-hidden="true"></i></div>
							<div className="ls-socialize-right-cell">LinkedIn</div>
						</a>
					</li>
				</ul>
			</div>
		);
	}
} 

export default MainSidebarSocialize;