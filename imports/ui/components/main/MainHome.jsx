import React, {Component} from 'react';
import MainSidebar from './MainSidebar';
import MainAdPost from './MainAdPost';

class MainHeader extends Component{
	render(){
		return(
			<div className="ls-main-home">
				<div className="ls-main-home-banner">
					<MainAdPost/>
				</div>
				<div className="ls-main-home-inner">
					<div className="ls-left-col">
						{this.props.children}
					</div>
					<div className="ls-right-col">
						<MainSidebar/>
					</div>
				</div>
			</div>
		);
	}
} 

export default MainHeader;