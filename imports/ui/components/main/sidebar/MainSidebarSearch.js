import React, {Component} from 'react';
import { browserHistory } from 'react-router';

class MainSidebarSearch extends Component{
	handleSearch(){
		var filter = this.refs.searchbar.value;
		if(filter){
			browserHistory.push(`/search/${filter}`);
		}
	}
	render(){
		return(
			<div className="ls-main-search">
				<h1 className="ls-sidebar-title">Search</h1>
				<div className="ls-search-wrapper">
					<div className="ls-search-left-cell">
						<input ref="searchbar" type="text" className="ls-searchbar"/>
					</div>
					<div className="ls-search-right-cell" >
						<div className="ls-search-button" onClick={this.handleSearch.bind(this)}>
							<i className="fa fa-search" aria-hidden="true"></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
} 

export default MainSidebarSearch;