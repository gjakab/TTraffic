import React,{ Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../../../api/posts/posts';
import { incrementViews } from '../../../../api/posts/methods';
import { Blogposts } from '../../../../api/blogposts/blogposts';
import MainSidebar from '../MainSidebar';
import ImageSlider from './ImageSlider';

class MainBlogPostPage extends Component{
	getTitle(){
		if(this.props.blogpost){
			return this.props.blogpost.title;
		}
	}
	getDescription(){
		if(this.props.blogpost){
			return {__html:this.props.blogpost.description};
		}
	}
	getMainImageSrc(){
		if(this.props.blogpost){
			return this.props.blogpost.mainImage.url;
		}
	}
	getImages(){
		if(this.props.blogpost){
			return this.props.blogpost.images;
		}
		else{
			return [];
		}
	}
	render(){
		return(
			<div className="ls-main-post-page ls-main-blog-post-page">
				<div className="ls-left-col">
					<div ref="container" className="ls-left-col-inner">
						<h1 className="ls-title">{this.getTitle()}</h1>
						<div className="ls-main-blog-post-image">
							<img src={this.getMainImageSrc()}/>
						</div>
						<p className="ls-description" dangerouslySetInnerHTML={this.getDescription()}></p>
						<ImageSlider images={this.getImages()}/>
					</div>					
				</div>
				<div className="ls-right-col">
					<MainSidebar/>
				</div>
			</div>
		);
	}
} 

export default createContainer((props) => {
	Meteor.subscribe('posts.public.single', props.id);
	Meteor.subscribe('blogposts.single', props.dataId);
  	return {
    	blogpost: Blogposts.findOne(props.dataId),
    	post: Posts.findOne(props.id),
    	id: props.id
    }
}, MainBlogPostPage);