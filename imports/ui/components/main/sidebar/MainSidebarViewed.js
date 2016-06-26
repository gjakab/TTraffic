import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../../../api/posts/posts';
import MainSidebarPost from './MainSidebarPost';

class MainSidebarViewed extends Component{
	componentDidMount(){
	}
	renderPosts(){
		if(this.props.posts && this.props.posts.length){
			return this.props.posts.map((post)=>{
				return <MainSidebarPost key={post._id} post={post}/>;
			})
		}
		else{
			return <div>No posts found</div>
		}
	}
	render(){
		return (
			<div>
				<h1 className="ls-sidebar-title">Most Viewed</h1>
				<ul className="ls-main-most-viewed">
					{this.renderPosts()}
				</ul>
			</div>
		)
	}
} 

export default createContainer((props) => {
	let params = {
		limit:5,
		sort:{
			views:-1
		}
	};
	
	//Meteor.subscribe('posts.public');
  	
  	return {
    	posts: Posts.find({},params).fetch(),
  	};
}, MainSidebarViewed);