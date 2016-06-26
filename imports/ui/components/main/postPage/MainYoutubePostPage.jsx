import React,{ Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../../../api/posts/posts';
import { incrementViews } from '../../../../api/posts/methods';
import { Videos } from '../../../../api/videos/videos';
import MainSidebar from '../MainSidebar';

class MainYoutubePostPage extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	     	videoWidth:'',
			videoHeight:''
	    };
  	}
	componentDidMount(){
		let videoWidth = this.refs.videoContainer.offsetWidth-30;
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

	render(){
		return(
			<div className="ls-main-post-page">
				<div className="ls-left-col" ref="videoContainer">
					<div ref="container" className="ls-left-col-inner">
						<h1 className="ls-title">{this.getTitle()}</h1>
						<div>
							<iframe is="iframe" ref="video" width={this.state.videoWidth} height={this.state.videoHeight} src={this.getEmbedSrc()} frameborder="0"  allowfullscreen="1" mozallowfullscreen="1" msallowfullscreen="1" oallowfullscreen="1" webkitallowfullscreen="1"></iframe>
						</div>
						<p className="ls-description" dangerouslySetInnerHTML={this.getDescription()}></p>
					</div>					
				</div>
				<div className="ls-right-col">
					<MainSidebar/>
				</div>
			</div>
		);
	}
} 

export default createContainer((props) => {
	Meteor.subscribe('posts.public.single', props.id);
	Meteor.subscribe('videos.single', props.dataId);
  	return {
    	video: Videos.findOne(props.dataId),
    	post: Posts.findOne(props.id),
    	id: props.id
    }
}, MainYoutubePostPage);