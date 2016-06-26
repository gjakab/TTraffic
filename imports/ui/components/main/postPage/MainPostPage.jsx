import React,{ Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../../../api/posts/posts';
import { incrementViews } from '../../../../api/posts/methods';
import MainYoutubePostPage from './MainYoutubePostPage';
import MainBlogPostPage from './MainBlogPostPage';

class MainPostPage extends Component{
	componentDidMount(){
		this.incrementViewCount();
	}
	incrementViewCount(){
		incrementViews.call(this.props.id);
	}
	renderPost(){
		if(this.props.post){
			if(this.props.post.type==='youtube'){ 
				return(
					<MainYoutubePostPage id={this.props.id} dataId={this.props.post.dataId}/>
				)
			}
			else if(this.props.post.type==='blog'){
				return(
					<MainBlogPostPage id={this.props.id} dataId={this.props.post.dataId}/>
				)
			}
			else{
				return(
					<div></div>
				)
			}
		}
		
	}
	render(){
		return(
			<div>
				{this.renderPost()}
			</div>
		);
	}
} 

export default createContainer(({params}) => {
	Meteor.subscribe('posts.public.single', params.id);
  	return {
    	post: Posts.findOne(params.id),
    	id: params.id
    }
}, MainPostPage);