import React, {Component} from 'react';
import { Link } from 'react-router';
import MainSidebarSearch from './sidebar/MainSidebarSearch';
import MainSidebarSocialize from './sidebar/MainSidebarSocialize';
import MainSidebarViewed from './sidebar/MainSidebarViewed';


class MainHeader extends React.Component{
	renderCategories(){
		const categories = [
		    'news',
		    'movies',
		    'technology',
		    'international',
		    'food',
		    'deals'
		];
		return categories.map((category, index)=>{
			let title = category.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			    return letter.toUpperCase();
			});
			return <li className="ls-top-nav-section" key={index}>
				<Link to={`/category/${category}`} className="ls-top-nav-link">
					{title}
				</Link>
			</li>
		});
		
	}
	toggleMenu(){
		var menu = $(this.refs.menu);
		menu.sidebar('toggle');
	}
	render(){
		return(
			<div className="ls-main-header">
				<div className="ls-main-header-inner">
					<div className="ls-logo-section ls-table-cell">
						<Link className="ls-logo-link" to="/">
							<div className="ls-logo-wrapper">
								<img className="ls-logo" src="/images/general/logo-placeholder.png"/>
							</div>
						</Link>
					</div>
					<div className="ls-top-nav ls-table-cell">
						<div className="ls-menu-button">
							<i className="sidebar icon" ref="menuButton" onClick={this.toggleMenu.bind(this)}></i></div>
						<ul className="ls-top-nav-inner">
							{this.renderCategories()}
						</ul>
						<div className="ls-main-sidebar ui right vertical sidebar" ref="menu">
							<ul className="ls-menu-sidebar">
								{this.renderCategories()}
							</ul>
							<MainSidebarSearch/>
							{/*<MainSidebarSocialize/>*/}
							<MainSidebarViewed/>
						</div>
					</div>
				</div>
			</div>
		);
	}
} 

export default MainHeader;