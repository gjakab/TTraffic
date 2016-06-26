import React,{ Component, PropTypes } from 'react';
import update from 'react-addons-update';
import { Link, browserHistory } from 'react-router';

import { insertPost } from '../../../../api/posts/methods';
import { insertVideo } from '../../../../api/videos/methods';

import {youtubeRequest} from '../../../../api/request/youtube';

class AdminAddPostList extends Component{
	constructor(props){
		super(props);
		this.state= {
			categories:[],
			tags:[],
			videoUrl:'',
			videoId:'',
			videoWidth:'',
			videoHeight:'',
			title:''
		};
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
		    	youtubeRequest(self.state.videoId, (err, video)=>{
					if(!err){
						let date = new Date(video.snippet.publishedAt);
						let dataId = insertVideo.call({
							title:self.state.title,
							description: tinymce.activeEditor.getContent(),
						    videoLink: self.state.videoUrl,
						    imageLink: (video.snippet.thumbnails.standard && video.snippet.thumbnails.standard.url) || (video.snippet.thumbnails.default && video.snippet.thumbnails.default.url) || 'default',
						    videoId: video.id,
                            channelId: video.snippet.channelId,
                            channelTitle: video.snippet.channelTitle,
                            date: date
						});
						if(dataId){
							let singlePost = {
                                type: 'youtube',
                                views: 0,
                                deleted:false,
                                newPost: false,
                                edited: true,
                                dataId: dataId,
                        		deleteDate:new Date(),
                        		author: Meteor.user().username,
                                categories: self.state.categories,
                                tags: self.state.tags,
                                postingDate: new Date(),
                                title: self.state.title,
                                date: new Date()
                            };
							if(insertPost.call(singlePost)){
								$(self.refs.dimmer).dimmer('show');
				    			setTimeout(function(){
				    				browserHistory.push('/admin');
				    			},1000);
							};
						}
					}
					else{
						console.log(err);
						$(self.refs.errorTitle).html(err.reason || err || 'Failed');
		    			$(self.refs.errorMessage).removeClass('hidden');
					}

				});
		    	return false;
		    },
		    onFailure(){
		        return false;
		    },
			fields:{
				url:{
					rules:[
						{
							type: 'regExp[/^(?:https?:\\/\\/)?(?:www\\.)?(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))((\\w|-){11})(?:\\S+)?$/]',
							prompt:'You should enter a youtube video link'
						}
					]
				},
				title:{
					rules:[
						{
							type: 'empty',
							prompt:'Enter a title'
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
		tinymce.init({
		  	selector: '#tinymce',  // change this value according to your HTML
		  	height: 250,
		  	toolbar: 'undo redo | styleselect | bold italic underline | link image',
		  	plugins : 'link',
		  	skin_url: '/packages/teamon_tinymce/skins/lightgray',
		  	statusbar: false,
		  	body_class: 'ls-tinymce-content',
		  	content_style: ".ls-tinymce-content { \
		  		color: rgba(0, 0, 0, 0.87); \
	  		    font-size: 0.9rem;\
    			font-family: Lato, sans-serif;\
		  	}\
		  	.ls-tinymce-content a{\
				color: #2a6496;\
    			text-decoration: none;\
		  	}"
		});
	}
	componentWillUnmount() {
	    tinymce.remove('#tinymce');
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
	onUrlChange(event){
		var value = $(event.target).val();
		const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		const youtubeVideoIdRegex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
		if(value.match(youtubeRegex)){
		    var match = value.match(youtubeVideoIdRegex);
		    var videoId = (match&&match[1].length==11)? match[1] : '';
		    var videoUrl = `https://www.youtube.com/embed/${videoId}`;

		    if(videoUrl && videoId){
				let newState = update(this.state,{
					videoId:{
						$set: videoId
					},
					videoUrl:{
						$set: videoUrl
					},
				});
				this.setState(newState);
				youtubeRequest(videoId, (err, video)=>{
					if(!err){
						let newState = update(this.state,{
							title:{
								$set: video.snippet.title
							},
							tags:{
								$set: video.snippet.tags? video.snippet.tags : []  
							}
						});
						this.setState(newState);
						if(video.snippet.description){
							tinymce.get('tinymce').execCommand('mceInsertContent', false, video.snippet.description);
						}
					}
					else{
						console.log(err);
						$(this.refs.errorTitle).html(err.reason || err || 'Failed');
		    			$(this.refs.errorMessage).removeClass('hidden');
					}
				});
		    }
		}
		else{
			//Error handling
		}

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
	render(){
		return(
			<div className="ls-admin-add-post">
				<div className="ui container">
					<div className="ls-title">
						<h2 className="ui header">
							<i className="add square icon"></i>
						  	<div className="content">
							    Add Post
						  	</div>
						</h2>	

						<div ref="errorMessage" className="ui hidden negative message">
							<i className="close icon" onClick={this.closeErrorMesageHandler}  onClick={this.closeErrorMesageHandler.bind(this)}></i>
								<div  ref="errorTitle" className="header">
									
								</div>
							<p ref="errorReason"></p>
						</div>


					</div>

					<form ref="form" className="ui form" id="ls-post-form">
						<div className="ui two column grid">
							<div className="ten wide column ls-left-column">
								<div className="ten wide column ls-right-column">
									<div className="field">
									    <label>URL</label>
									    <div className="ui input" >
											<input onChange={this.onUrlChange.bind(this)} type="text" name="url" placeholder="Post URL" ref="url"/>
										</div>
									</div><div className="field">
									    <label>Title</label>
									    <div className="ui corner labeled input">
											<input value={this.state.title} onChange={this.onTitleChange.bind(this)} type="text" name="title" placeholder="Title" id="ls-title-input"/>
											<div className="ui corner label">
											    <i className="asterisk icon"></i>
											</div>
										</div>
									</div>
									<div className="field">
									    <label>Text</label>
									    <div className="editor" id="tinymce">
										</div>
									</div>
									<div className="field">
									    <label>Category tags</label>
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
							<div ref="container" className="six wide column ls-right-column">
								<div className="ls-right-column-upper">
									<div className={this.state.videoUrl?'ls-hide':''}>
									  	<img src="/images/general/video-placeholder.jpg"/>
									</div>
									<div className={this.state.videoUrl?'':'ls-hide'}>
									  	<iframe ref="video" width={this.state.videoWidth} height={this.state.videoHeight} src={this.state.videoUrl} frameborder="0" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>
									</div>
								</div>
								<div className="ls-right-column-lower">
									<div className="ui container ls-button-section">
										<div className="ui buttons">
											<Link className="ui button" to="/admin">
											 	Cancel
											</Link>
											<div className="or"></div>
											<button className="ui primary button" type="submit">
											  	Add
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
								  	<i className="add square icon"></i>
								  	<div className="ls-dimmer-title content">
									    Post added
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


export default AdminAddPostList;
