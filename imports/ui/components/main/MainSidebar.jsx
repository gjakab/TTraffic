import React, {Component} from 'react';
import MainSidebarSearch from './sidebar/MainSidebarSearch';
import MainSidebarSocialize from './sidebar/MainSidebarSocialize';
import MainSidebarViewed from './sidebar/MainSidebarViewed';
import MainSidebarAd from './sidebar/MainSidebarAd';

class MainSidebar extends Component{
	render(){
		return(
			<div className="ls-main-sidebar">
				<div className="ls-main-sidebar-inner">
					<MainSidebarAd/>
					<MainSidebarSearch/>
					{/*<MainSidebarSocialize/>*/}
					<MainSidebarViewed/>
				</div>
			</div>
		);
	}
} 

export default MainSidebar;