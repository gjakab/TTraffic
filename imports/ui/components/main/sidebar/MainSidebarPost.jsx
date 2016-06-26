import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Videos } from '../../../../api/videos/videos';
import { Blogposts } from '../../../../api/blogposts/blogposts';




class MainSidebarPost extends Component{
	getPostUrl(){
		let post = this.props.post;
		return `/post/${post._id}/${post.dataId}`;
	}
	getImage(){
		if(this.props.type==='youtube' && this.props.data){
			return this.props.data.imageLink!=='default'?this.props.data.imageLink:'/images/general/video-placeholder.jpg';
		}
		else if(this.props.type==='blog' && this.props.data){
			return this.props.data.mainImage.url?this.props.data.mainImage.url:'/images/general/image-placeholder.png';
		}
	}
	getTitle(){
		if(this.props.data){
			if(this.props.data.title.length>35){
				return this.props.data.title.substr(0,35)+'...';
			}
			else{
				return this.props.data.title;
			}
		}
	}
	render(){
		return(
			<li className="ls-main-most-viewed-item">
				<Link className="ls-main-most-viewed-item-inner" to={this.getPostUrl()}>
					<div className="ls-left-col">
						<img src={this.getImage()}/>
					</div>
					<div className="ls-right-col">
						<p>
							{this.getTitle()}
						</p>
					</div>
				</Link>
			</li>	
		);
	}
} 

export default createContainer(({post}) => {

	if(post.type==='youtube'){
		Meteor.subscribe('videos.single', post.dataId);
	  	return {
	  		data: Videos.findOne(post.dataId),
	  		type: post.type
	    };
	}
	else if(post.type==='blog'){
		Meteor.subscribe('blogposts.single', post.dataId);
	  	return {
	  		data: Blogposts.findOne(post.dataId),
	  		type: post.type
	    };
	}

}, MainSidebarPost);