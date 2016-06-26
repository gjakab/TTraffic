import React from 'react';
import MainHeader from '../components/main/MainHeader';
import MainFooter from '../components/main/MainFooter';

class MainLayout extends React.Component{
	constructor(props){
		super(props);		
	}
	render(){
		return(
			<div className="ls-main-layout">
				<div className="ls-main-layout-inner">
					<MainHeader/>
					<div className="ls-main-content">
						<div className="ls-main-content-inner">
							{this.props.children}
						</div>
					</div>
					<MainFooter/>
				</div>
			</div>
		);
	}
}

export default MainLayout;