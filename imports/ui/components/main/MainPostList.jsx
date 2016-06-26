import { Meteor } from 'meteor/meteor';
import React,{ Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link , browserHistory} from 'react-router';
import { Posts } from '../../../api/posts/posts.js';
import MainYoutubePost from './MainYoutubePost';
import MainBlogPost from './MainBlogPost';
import MainAdPost from './MainAdPost';

class MainPostList extends Component{
	// componentDidMount(){
	// 	$.ajax({
	// 	  url: '//cdn.chitika.net/getads.js',
	// 	  dataType: "script",
	// 	  success: success
	// 	});
	// }
	loadMoreClass(){
		return this.props.posts.length<this.props.limit?'ls-hide':'';
	}
	loadMoreLink(){
		let limit = this.props.limit+10;
		return `/${limit}`;
	}
	renderPosts(){
		if(this.props.posts.length){
			let posts = [];
			for(let i = 0;i<this.props.posts.length;i++){
				let post = this.props.posts[i];
				if(this.props.posts[i].type=='youtube'){
					posts.push(<MainYoutubePost post={post} key={post._id}/>);
				}
				else if(this.props.posts[i].type=='blog'){
					posts.push(<MainBlogPost post={post} key={post._id}/>);
				}
				if((i+1)%4 == 0){
					posts.push(<MainAdPost key={i}/>)
				}
			}
			return posts;
		}
		else if(this.props.location.pathname.indexOf('search')!==-1){
			return <div>No results found!</div>
		}
	}
	render(){
		return(
			<div>
				<ul className="ls-main-post-list">
					{this.renderPosts()}
				</ul>
				<div className={this.loadMoreClass()}>
					<div className="ls-load-more-button-wrapper">
						<Link className="ui labeled icon button ls-load-more-button" to={this.loadMoreLink()}> <i className="angle down icon"></i>Load more videos</Link>
					</div>
				</div>
			</div>
		);
	}
} 

export default createContainer((props) => {
	let limit = parseInt(props.params.limit) || 10;
	let params ={
		limit: limit,
		sort: { 
			date: -1 
		} 
	};

	if(props.params.filter){
		Meteor.subscribe('posts.public', props.params.filter);
		return {
	    	posts: Posts.find({},params).fetch(),
	    	limit: limit
	  	};
	}
	else{
		Meteor.subscribe('posts.public');
	  	if(props.params.category){
		  	return {
		    	posts: Posts.find({
		    		categories: props.params.category
		    	},params).fetch(),
		    	limit: limit
		  	};	
	  	}
	  	else{
	  		return {
		    	posts: Posts.find({},params).fetch(),
		    	limit: limit
		  	};	
	  	}
	}
}, MainPostList);