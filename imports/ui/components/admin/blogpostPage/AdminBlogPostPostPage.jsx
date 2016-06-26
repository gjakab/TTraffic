import React,{ Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import update from 'react-addons-update';
import { Blogposts } from '../../../../api/blogposts/blogposts';
import ImageSlider from '../../main/postPage/ImageSlider';
import { Link } from 'react-router';

class AdminPostPage extends Component{
	getTitle(){
		if(this.props.blogposts){
			return this.props.blogposts.title;
		}
	}
	getDescription(){
		if(this.props.blogposts){
			return this.props.blogposts.description;
		}
	}
	getMainImage(){
		if(this.props.blogposts){
			return this.props.blogposts.mainImage.url;
		}
	}
	renderSlider(){
		if(this.props.blogposts){
			return <ImageSlider images={this.props.blogposts.images}/>;
		}
	}
	getAuthor(){
		if(this.props.post){
			return this.props.post.author;
		}
	}
	render(){
		return(
			<div className="ls-admin-post-page">
				<div className="ls-left-col">
					<div className="ls-left-col-inner">
						<div className="ls-title-table">
							<div className="ls-title-table-left">
								<h1 className="ls-title">
									{this.getTitle()}
									<div>
										<span className="ui label">Author: {this.getAuthor()}</span>
									</div>
								</h1>
							</div>
							<div className="ls-title-table-right">
							 	<Link className="ui primary labeled icon button" to={`/admin/post/edit/${this.props.post._id}/${this.props.post.dataId}`}>
								  	<i className="edit icon"></i>
								  	Edit
								</Link>
							</div>
						</div>
						<div className="ui two column grid">
							<div className="column ls-right-column">
								<div ref="container">
									<img src={this.getMainImage()}/>
								</div>
							</div>
							<div className="column ls-right-column">
								<p className="ls-description"  dangerouslySetInnerHTML={{__html: this.getDescription()}}></p>
							</div>
						</div>
						{this.renderSlider()}
					</div>				
				</div>
			</div>
		);
	}
} 

export default createContainer(({post}) => {
	Meteor.subscribe('blogposts.single', post.dataId);
  	return {
    	blogposts: Blogposts.findOne(post.dataId),
    	post: post
    }
}, AdminPostPage);