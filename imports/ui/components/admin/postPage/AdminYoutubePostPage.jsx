import React,{ Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import update from 'react-addons-update';
import { Videos } from '../../../../api/videos/videos';
import { Link } from 'react-router';


class AdminPostPage extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	     	videoWidth:'',
			videoHeight:''
	    };
  	}
  	componentDidMount(){
		let videoWidth = this.refs.container.clientWidth;
		let videoHeight = 0.5625 * videoWidth;
		this.setState({
			videoWidth,
			videoHeight
		});
	}
	getTitle(){
		if(this.props.video){
			return this.props.video.title;
		}
	}
	getDescription(){
		if(this.props.video){
			return {__html:this.props.video.description};
		}
	}
	getEmbedSrc(){
		if(this.props.video){
			return `https://www.youtube.com/embed/${this.props.video.videoId}`
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
									<iframe is="iframe" ref="video" width={this.state.videoWidth} height={this.state.videoHeight} src={this.getEmbedSrc()} frameborder="0"  allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>
								</div>
							</div>
							<div className="column ls-right-column">
								<p className="ls-description"  dangerouslySetInnerHTML={this.getDescription()}></p>
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
}, AdminPostPage);