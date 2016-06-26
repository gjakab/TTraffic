import React,{ Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../../../api/posts/posts';
import AdminYoutubePostPage from './AdminYoutubePostPage';
import AdminBlogPostPostPage from '../blogpostPage/AdminBlogPostPostPage';


class AdminPostPage extends Component{
	getContent(){
		if(this.props.post){
			if(this.props.post.type==='youtube'){
				return <AdminYoutubePostPage post={this.props.post}/>;
			}
			else if(this.props.post.type==='blog'){
				return <AdminBlogPostPostPage post={this.props.post}/>;
			}
		}
	}
	render(){
		return(
			<div>
				{this.getContent()}
			</div>
		);
	}
} 

export default createContainer(({params}) => {
	Meteor.subscribe('posts.private.single', params.id);
  	return {
    	post: Posts.findOne(params.id)
    }
}, AdminPostPage);