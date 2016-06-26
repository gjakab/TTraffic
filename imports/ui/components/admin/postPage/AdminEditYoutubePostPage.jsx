import React,{ Component, PropTypes } from 'react';
import update from 'react-addons-update';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Videos } from '../../../../api/videos/videos';

import { editPost } from '../../../../api/posts/methods';
import { editVideo } from '../../../../api/videos/methods';

class AdminEditYoutubePostPage extends Component{
	constructor(props){
		super(props);
		let self = this;
		this.state= {
			videoWidth:'',
			videoHeight:'',
			categories:[],
			tags:[],
			title: '',
			text: '',
			imageUrl:'',
			videoUrl:''
		};
	}
	componentWillMount(){
		if(this.props.video && this.props.post){
			let newState = update(this.state,{
				categories:{
					$set: this.props.post.categories
				},
				tags:{
					$set: this.props.post.tags
				},
				title: {
					$set: this.props.video.title
				},
				text: {
					$set: this.props.video.description
				},
				imageUrl: {
					$set: this.props.video.imageLink
				},
				videoUrl:{
					$set: this.props.video.videoLink
				}
			});
			this.setState(newState);
		}
	}
	componentDidMount(){
		var self = this;
		let videoWidth = this.refs.container.clientWidth;
		let videoHeight = 0.5625 * videoWidth;
		let newState = update(this.state,{
			videoWidth:{
				$set: videoWidth
			},
			videoHeight:{
				$set:videoHeight
			}
		});
		this.setState(newState);

		$(this.refs.form).form({
			inline : true,
		    on     : 'blur',
		    onSuccess(event, fields){
		    	event.preventDefault();
		    	let editedVideo = {
		    		id:self.props.video._id,
		    		title:self.state.title,
		    		description:self.state.text
		    	};
		    	if(editVideo.call(editedVideo)){
		    		let editedPost = {
			    		id:self.props.post._id,
			    		categories:self.state.categories,
			    		title: self.state.title,
			    		author: Meteor.user().username,
			    		tags:self.state.tags
			    	}
		    		if(editPost.call(editedPost)){
		    			$(self.refs.dimmer).dimmer('show');
		    			setTimeout(function(){
		    				browserHistory.push('/admin');
		    			},1000);
		    		}
		    		else{
		    			(self.refs.errorTitle).html('Failed to update the post');
		    			$(self.refs.errorMessage).removeClass('hidden');
		    		}
		    	}
		    	else{
		    		$(self.refs.errorTitle).html('Failed to update the video');
		    		$(self.refs.errorMessage).removeClass('hidden');
		    	}
		    },
		    onFailure(){
		        return false;
		    },
			fields:{
				title:{
					rules:[
						{
							type: 'empty',
							prompt:'Enter a title'
						}
					]
				},
				text:{
					rules:[
						{
							type: 'empty',
							prompt:'Enter the text'
						}
					]
				}
			}
		});
		$(this.refs.categoryTags).dropdown({
			onChange: function(value, text, $selectedItem) {
				if(self.state.categories.indexOf(value)==-1){
					let newState = update(self.state, {
				      	categories : {
				        	$push : [value]
				      	}
				  	});
				  	self.setState(newState);
				}
		    }
		});
	}
	closeErrorMesageHandler(event){
		$(event.target)
		    .closest('.message')
		    .transition('fade');
	}
	onTitleChange(event){
		let newState = update(this.state,{
			title: {
				$set:event.target.value
			}
		})
		this.setState(newState);
	}
	onTextChange(event){
		let newState = update(this.state,{
			text: {
				$set:event.target.value
			}
		})
		this.setState(newState);
	}
	onRemoveCategoryTag(event){
		let item = $(event.target).attr('data-category');
		let newCategories = this.state.categories.filter(function(category){
			return category!==item;
		});
		let newState = update(this.state,{
			categories: {
				$set: newCategories
			}
		});
		this.setState(newState);
	}
	renderCategories(){
		const categories = [
		    'news',
		    'movies',
		    'technology',
		    'international',
		    'food',
		    'deals'
		];
		return categories.map((category,index) => {
			let title = category.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			    return letter.toUpperCase();
			});
			return <div className="item" data-category={category} key={index}>{title}</div>
		});
	}
	renderCategoryTags(){
		return this.state.categories.map((category,index) => {
			let title = category.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			    return letter.toUpperCase();
			});

			return (
				<div key={index} className="ui label ls-tag" data-category={category}>
					{title}
				  	<i className="delete icon" data-category={category} onClick={this.onRemoveCategoryTag.bind(this)}></i>
				</div>
			);
		});
	}
	onTagAdd(event){
		let tag = this.refs.tagInput.value;
		if(tag && this.state.tags.indexOf(tag)==-1){
			let newState = update(this.state, {
		      	tags : {
		        	$push : [tag]
		      	}
		  	});
		  	this.setState(newState);
		  	this.refs.tagInput.value='';
		}
	}
	onRemoveTag(event){
		let item = $(event.target).attr('data-tag');
		let newTags = this.state.tags.filter(function(tag){
			return tag!==item;
		});
		let newState = update(this.state,{
			tags: {
				$set: newTags
			}
		});
		this.setState(newState);
	}
	renderTags(){
		return this.state.tags.map((tag,index) => {
			return (
				<div key={index} className="ui label ls-tag" data-tag={tag}>
					{tag}
				  	<i className="delete icon" data-tag={tag} onClick={this.onRemoveTag.bind(this)}></i>
				</div>
			);
		});
	}
	render(){
		return(
			<div className="ls-admin-add-post">
				<div className="ui container">
					<div className="ls-title">
						<h2 className="ui header">
						  	<i className="edit icon"></i>
						  	<div className="content">
							    Edit Post
						  	</div>
						</h2>	

						<div ref="errorMessage" className="ui hidden negative message">
							<i className="close icon" onClick={this.closeErrorMesageHandler}  onClick={this.closeErrorMesageHandler.bind(this)}></i>
								<div  ref="errorTitle" className="header">
									
								</div>
						</div>


					</div>

					<form ref="form" className="ui form" id="ls-post-form">
						<div className="ui two column grid">
							<div className="ten wide column ls-left-column">
								<div>
									<div className="field">
									    <label>Title</label>
									    <div className="ui corner labeled input">
											<input value={this.state.title} onChange={this.onTitleChange.bind(this)} type="text" name="title" placeholder="Title" id="ls-title-input"/>
											<div className="ui corner label">
											    <i className="asterisk icon"></i>
											</div>
										</div>
									</div>
									<div className="field">
									    <label>Video Link</label>
									    <div className="ui corner labeled input">
									    	<div className="ui block header ls-video-link">
												{this.state.videoUrl}
											</div>
										</div>
									</div>
									<div className="field">
									    <label>Description</label>
									    <div className="ui corner labeled input" >
									   		<textarea value={this.state.text} onChange={this.onTextChange.bind(this)} name="text" placeholder="Post text" id="ls-text-input"></textarea>
											<div className="ui corner label">
											    <i className="asterisk icon"></i>
											</div>
										</div>
									</div>
									<div className="field">
									    <label>Categories</label>

									  	<div className="ui selection dropdown" ref="categoryTags">
											<input type="hidden" name="categoryTags"/>
											<i className="dropdown icon"></i>
											<div className="default text">Category tags</div>
											<div className="menu">
												{this.renderCategories()}
											</div>
										</div>

										<div className="ls-tag-list">
											<div className="ls-tag-list-inner">
												{this.renderCategoryTags()}
											</div>
										</div>
									</div>

									<div className="field">
									    <label>Tags</label>

										<div className="ui right labeled left icon input">
											<i className="tags icon"></i>
											<input type="text" placeholder="Enter tags" ref="tagInput"/>
											<span className="ui tag label ls-add-tag-button" onClick={this.onTagAdd.bind(this)}>
											    Add Tag
											</span>
										</div>

										<div className="ls-tag-list">
											<div className="ls-tag-list-inner">
												{this.renderTags()}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="six wide column ls-right-column">
								<div className="ls-right-column-upper">
									<div className={this.state.imageUrl?'ls-hide':''}>
									  	<img src="/images/general/video-placeholder.jpg"/>
									</div>
									<div  ref="container" className={this.state.imageUrl?'ls-thumbnail-container':'ls-hide ls-thumbnail-container'}>
									  	<img src={this.state.imageUrl}/>
									</div>
								</div>
								<div className="ls-right-column-lower">
									<div className="ui container ls-button-section">
										<div className="ui buttons">
											<Link className="ui button" to='/admin'>
											 	Cancel
											</Link>
											<div className="or"></div>
											<button className="ui primary button" type="submit">
											  	Post
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="ui blurring segment">
					<div ref="dimmer" className="ui page inverted dimmer">
						<div className="content">
						    <div className="center">
						    	<h2 className="ui icon header">
							  		<i className="edit icon"></i>
								  	<div className="ls-dimmer-title content">
									    Post edited
								  	</div>
								</h2>
						    </div>
						</div>
					</div>
				</div>
			</div>
		);
	}
} 

export default createContainer(({post}) => {
	Meteor.subscribe('videos.single', post.dataId);
  	return {
    	video: Videos.findOne(post.dataId),
    	post: post
    }
}, AdminEditYoutubePostPage);

