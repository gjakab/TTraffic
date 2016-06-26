import React,{ Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Blogposts } from '../../../api/blogposts/blogposts';
import { deletePost, recoverPost } from '../../../api/posts/methods';


class AdminBlogPost extends Component{
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
	onPostDelete(){
		deletePost.call(this.props.post._id);
	}
	onPostRecover(){
		recoverPost.call(this.props.post._id);
	}
	getTime(){
		let date = this.props.post && this.props.post.date;
		if(date){
			return date.toLocaleTimeString()+' '+date.toLocaleDateString();
		}
	}
	renderButtons(){
		if(this.props.section==='deleted'){
			return <button onClick={this.onPostRecover.bind(this)} className="ui positive labeled icon button">
				  	<i className="repeat icon"></i>
				  	Recover
				</button>
		}
		else{
			return <div className="ui vertical right labeled icon buttons">
				<Link  to={`/admin/post/edit/${this.props.post._id}/${this.props.post.dataId}`} className="ui primary button">
				    <i className="edit icon"></i>
				    Edit
				</Link>
				<button onClick={this.onPostDelete.bind(this)} className="ui negative button">
				    Delete
				    <i className="remove icon"></i>
				</button>
			</div>
		}
	}
	render(){
		return(
			<li className="ls-admin-post ui item">
				<div className="ls-left-cell image">
					<Link className="ls-segment" to={`/admin/post/${this.props.post._id}/${this.props.post.dataId}`}>
						<img className="ls-post-image" src={this.getImage()}/>
					</Link>
				</div>
				<div className="ls-right-cell content">
					<Link className="ls-segment" to={`/admin/post/${this.props.post._id}/${this.props.post.dataId}`}>
						<h1 className="ls-post-title">
							{this.getTitle()}
							<span className="ui label ls-post-date">
								{this.getTime()}
							</span>
						</h1>
						<p className="ls-post-text" dangerouslySetInnerHTML={this.getDescription()}>
						</p>
					</Link>
				</div>
				<div className="ls-button-cell">
						{this.renderButtons()}
				</div>
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
}, AdminBlogPost);