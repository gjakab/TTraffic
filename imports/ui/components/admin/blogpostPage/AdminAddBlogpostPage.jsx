import React,{ Component, PropTypes } from 'react';
import update from 'react-addons-update';
import { Link, browserHistory } from 'react-router';

import { insertPost } from '../../../../api/posts/methods';
import { insertBlogpost } from '../../../../api/blogposts/methods';

import AdminBlogpostImageSection from './AdminBlogpostImageSection';

class AdminAddBlogpostPage extends Component{
	constructor(props){
		super(props);
		this.state= {
			categories:[],
			tags:[],
			mainImage:null,
			images:[],
			title:'',
		};
	}
	componentDidMount(){
		var self = this;

		$(this.refs.form).form({
			inline : true,
		    on     : 'blur',
		    onSuccess(event, fields){
		    	event.preventDefault();
		    	let date = new Date();
		    	let dataId = insertBlogpost.call({
		    		title: self.state.title,
				    description: tinymce.activeEditor.getContent(),
				    mainImage: self.state.mainImage,
				    images: self.state.images,
				    date: date
		    	});
		    	if(dataId){
		    		let singlePost = {
		    			type: 'blog',
                        views: 0,
                        newPost: false,
                        deleted:false,
                        deleteDate:new Date(),
                        edited: true,
                        dataId: dataId,
                        categories: self.state.categories,
                        tags: self.state.tags,
                        author: Meteor.user().username,
                        postingDate: new Date(),
                        title: self.state.title,
                        date: date
		    		}
		    		if(insertPost.call(singlePost)){
						$(self.refs.dimmer).dimmer('show');
		    			setTimeout(function(){
		    				browserHistory.push('/admin');
		    			},1000);
					};
		    	}
		    	else{
		    		//SHOW ERROR
		    	}
		    	return false;
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
	changeMainImage(image){
		let newState = update(this.state,{
			mainImage:{
				$set: image
			}
		})
		this.setState(newState);
	}
	addImage(image){
		let newState = update(this.state,{
			images:{
				$unshift: [image]
			}
		})
		this.setState(newState);
	}
	deleteImage(changedImages){
		let newImages;
		if(changedImages.hasOwnProperty('mainImage')){
			newImages={
				images:{
					$set: changedImages.images
				},
				mainImage:{
					$set: changedImages.mainImage
				}
			}
		}
		else{
			newImages={
				images:{
					$set: changedImages.images
				}
			}
		}
		let newState = update(this.state,newImages)
		this.setState(newState);
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
	getMainImage(){
		if(this.state.mainImage){
			return this.state.mainImage.url;
		}
		else{
			return '/images/general/image-placeholder.png';
		}
	}
	render(){
		return(
			<div className="ls-admin-add-post ls-admin-add-blogpost">
				<div className="ui container">
					<div className="ls-title">
						<h2 className="ui header">
						  	<i className="file text icon"></i>
						  	<div className="content">
							    Add blog post
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
									    <label>Text</label>
									    <div className="editor" id="tinymce">
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
											<span className="ui ls-add-tag-button tag label" onClick={this.onTagAdd.bind(this)}>
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
									<AdminBlogpostImageSection 
										changeMainImage={this.changeMainImage.bind(this)} 
										addImage={this.addImage.bind(this)} 
										getMainImage={this.getMainImage.bind(this)}
										deleteImage = {this.deleteImage.bind(this)}
										mainImage={this.state.mainImage} 
										images={this.state.images} 
									/>
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
							  		<i className="file text icon"></i>
								  	<div className="ls-dimmer-title content">
									    Blog post added
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

export default AdminAddBlogpostPage;
