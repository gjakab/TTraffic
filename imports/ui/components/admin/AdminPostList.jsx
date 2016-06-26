import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React,{ Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AdminYoutubePost from './AdminYoutubePost';
import AdminBlogPost from './AdminBlogPost';
import { Posts } from '../../../api/posts/posts.js';
import { Poll } from '../../../api/poll/poll.js';

class AdminPostList extends Component{
	loadMoreClass(){
		return this.props.posts.length<this.props.limit?'ls-hide ls-load-more-container':'ls-load-more-container';
	}
	loadMoreLink(){
		let limit = this.props.limit+50;
		return `/admin/${limit}`;
	}
	getLastPoll(){
		if(this.props.lastPoll){
			let date = this.props.lastPoll.date;
			return date.toLocaleTimeString()+' '+date.toLocaleDateString();
		}
	}
	renderPosts(){
		if(this.props.posts.length){
			return this.props.posts.map((post)=>{
				if(post.type==='youtube'){
					return <AdminYoutubePost section={this.props.params.section} post={post} key={post._id}/>
				}
				else if(post.type==='blog'){
					return <AdminBlogPost section={this.props.params.section} post={post} key={post._id}/>
				}
			});
		}
		else{
			return <h2 className="ui center aligned">
				No posts found
			</h2>
		}
	}
	render(){
		return(
			<div>
				<div className="ls-last-poll">
					<div className="ui large orange label">
						<i className="history icon"/>
						Updated at {this.getLastPoll()}
					</div>
				</div>
				<ul className="ls-admin-post-list segment ui divided items">
					{this.renderPosts()}
				</ul>
				<div className={this.loadMoreClass()}>
					<Link className="ui button" to={this.loadMoreLink()}>Load more videos</Link>
				</div>
			</div>
		);
	}
} 

export default createContainer((props) => {
	let limit = parseInt(props.params.limit) || 100;
	let params ={
		limit: limit,
		sort: { 
			date: -1 
		} 
	};
	Meteor.subscribe('poll.last');
	let lastPoll = Poll.findOne();
	if(props.params.section==='posted'){
		Meteor.subscribe('posts.private.posted',params);
		return {
	    	posts: Posts.find({}).fetch(),
	    	limit: limit,
	    	lastPoll: lastPoll
	  	};
	}
	else if(props.params.section==='deleted'){
		Meteor.subscribe('posts.private.deleted', params);
		return {
	    	posts: Posts.find({}).fetch(),
	    	limit: limit,
	    	lastPoll: lastPoll
	  	};
	}
	else if(props.params.section==='deals'){
		Meteor.subscribe('posts.private.deals', params);
		return {
	    	posts: Posts.find({}).fetch(),
	    	limit: limit,
	    	lastPoll: lastPoll
	  	};
	}
	else{
		Meteor.subscribe('posts.private', params);
	  	return {
	    	posts: Posts.find({}).fetch(),
	    	limit: limit,
	    	lastPoll: lastPoll
	  	};
	}
}, AdminPostList);