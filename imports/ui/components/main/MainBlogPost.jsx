import React,{ Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Blogposts } from '../../../api/blogposts/blogposts';

class MainBlogPost extends Component{
	getImage(){
		if(this.props.blogpost){
			return this.props.blogpost.mainImage?this.props.blogpost.mainImage.url:'/images/general/image-placeholder.png';
		}
	}
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
	renderCategories(){
		let categories = [];
		for(let index =0;index<this.props.post.categories.length && index<5;index++){
			categories.push(
				<div key={index} className="ui label ls-tag ls-category-tag" data-tag={this.props.post.categories[index]}>
					{this.props.post.categories[index]}
				</div>
			);
		}
		return categories;
	}
	renderTags(){
		let tags = [];
		for(let index =0;index<this.props.post.tags.length && index<5;index++){
			tags.push(
				<div key={index} className="ui label ls-tag" data-tag={this.props.post.tags[index]}>
					{this.props.post.tags[index]}
				</div>
			);
		}
		return tags
	}
	getTime(){
		let date = this.props.post && this.props.post.postingDate;
		if(date){
			return date.toLocaleTimeString()+' '+date.toLocaleDateString();
		}
	}
	render(){
		return(
			<li className="ls-main-post">
				<Link to={`/post/${this.props.post._id}/${this.props.post.dataId}`}>
					<div className="ls-main-post-inner">
						<div className="ls-left-cell">
							<img className="ls-post-image" src={this.getImage()}/>
						</div>
						<div className="ls-right-cell">
							<h1 className="ls-post-title">
								<span className="ls-post-title-inner">
									{this.getTitle()}
								</span>
								{/*<span className="ui label ls-post-date">
									{this.getTime()}
								</span>*/}
							</h1>
							<p className="ls-post-text" dangerouslySetInnerHTML={this.getDescription()}>
							</p>
							<div className="ls-tag-container">
								{this.renderCategories()}
								{this.renderTags()}
							</div>
						</div>
					</div>
				</Link>
			</li>
		);
	}
} 

export default createContainer(({post}) => {
	Meteor.subscribe('blogposts.single', post.dataId);
  	return {
    	blogpost: Blogposts.findOne(post.dataId),
    	post: post
    }
}, MainBlogPost);