import React,{ Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../../../../api/posts/posts';
import AdminEditYoutubePostPage from './AdminEditYoutubePostPage';
import AdminEditBlogPostPage from '../blogpostPage/AdminEditBlogPostPage';

class AdminEditPostList extends Component{
	renderEditPage(){
		if(this.props.post){
			if(this.props.post.type==='youtube'){
				return <AdminEditYoutubePostPage post={this.props.post}/>;
			}
			else if(this.props.post.type==='blog'){
				return <AdminEditBlogPostPage post={this.props.post}/>
			}
		}
	}
	render(){
		return(
			<div>
				{this.renderEditPage()}
			</div>
		);
	}
} 

export default createContainer(({params}) => {
	Meteor.subscribe('posts.private.single', params.id);
  	return {
    	post: Posts.findOne(params.id)
    }
}, AdminEditPostList);

