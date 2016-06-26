import React,{ Component, PropTypes } from 'react';
import update from 'react-addons-update';
import {Cloudinary} from 'meteor/lepozepo:cloudinary';

class AdminBlogpostImageSection extends Component{
	onChangeMainImage(event){
		var publicId = $(event.target).closest('.ls-post-image').attr('data-public-id');
		this.props.changeMainImage(_.findWhere(this.props.images,{
				public_id:publicId
			}));
	}
	onDeleteImage(event){
		var loader = $(event.target).closest('.ls-post-image-inner').find('.ls-image-block-loader').addClass('active');
		var self = this;
		var publicId = $(event.target).closest('.ls-post-image').attr('data-public-id');
		//call to Cloudinary to remove the image with publicId.
		Cloudinary.delete(publicId, function(err, res) {
			if(err){
				//showing an error message if removal was not successful.
				loader.removeClass('active');
		        console.log("Delete Error: " + err);
			}
			else{
				var changedImages = _.without(self.props.images,_.findWhere(self.props.images,{
					public_id:publicId
				}));

				if(publicId==self.props.mainImage.public_id){
					self.props.deleteImage({
						mainImage:_.first(changedImages),
						images: changedImages
					});
				}
				else{
					self.props.deleteImage({
						images: changedImages
					});
				}
			}
	    });
	}
	renderImagesBlocks(){
		return this.props.images.map((image) => {
	        return <ImageBlock key={image.public_id} image={image} deleteImage={this.onDeleteImage.bind(this)} changeMainImage={this.onChangeMainImage.bind(this)}/>;
	    });
	}
	onUploadButtonClick(){
		this.refs.imageUpload.click();
	}
	onUploadChange(event){
		let self = this;
		let files = event.currentTarget.files;
		let uploadButton = $(this.refs.imageUploadButton);
		let mainLoader = $(this.refs.mainImageLoader);
		if(files.length){
			mainLoader.addClass('active');
			uploadButton.addClass('loading ls-disabled');
		}
	    return Cloudinary.upload(files, {
			width: 960, 
			height: 720,
			crop: 'fill'
	    }, function(err, res) {
	    	if(err){
		        console.log("Upload Error: " + err);
	    	}
	    	else{
				self.props.changeMainImage(_.pick(res,'public_id','format','url'));
			    self.props.addImage(_.pick(res,'public_id','format','url'));
	    	}
	    	uploadButton.removeClass('loading ls-disabled');
	    	mainLoader.removeClass('active');
	    });
	}
	render(){
		return (
			<div className="one column ui grid">
				<div className="column ls-main-image">
					<div>
						<div className="ui inverted dimmer" ref="mainImageLoader" id="ls-main-image-loader">
					    	<div className="ui large  loader"></div>
					  	</div>
						<img src={this.props.getMainImage()}/>
					</div>
				</div>
				<div className="three column row">
					{this.renderImagesBlocks()}
					<div className="column">
						<div className="ui labeled icon button primary" onClick={this.onUploadButtonClick.bind(this)} ref="imageUploadButton"  id="ls-image-upload-button">
							<i className="upload icon"></i>
							Add image
							<input type="file" ref="imageUpload" accept="image/*" className="ls-hide" id="ls-image-upload" onChange={this.onUploadChange.bind(this)}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class ImageBlock extends Component{
	render(){
		return(
			<div className="column ls-post-image" data-public-id={this.props.image.public_id}>
				<div className="ls-post-image-inner">
					<div className="ui inverted dimmer ls-image-block-loader">
				    	<div className="ui loader"></div>
				  	</div>
					<div className="ls-image-buttons">
						<i className="ls-make-main home icon" onClick={this.props.changeMainImage.bind(this)}></i>
						<i className="ls-delete-image remove icon" onClick={this.props.deleteImage.bind(this)}></i>
					</div>
					<img src={this.props.image.url}/>
				</div>
			</div>
		);
	}
};

export default AdminBlogpostImageSection;