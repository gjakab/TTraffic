import React,{ Component, PropTypes } from 'react';
import update from 'react-addons-update';

class ImageSlider extends Component{
	constructor(props){
		super(props);
		this.state={
			imageUrl:'',
			imageIndex: 0
		}
	}
	imageClickHandler(event){
		let newState=update(this.state,{
			imageUrl:{
				$set: $(event.target).attr('src')
			},
			imageIndex:{
				$set: $(event.target).attr('data-index')
			}
		})
		this.setState(newState);
		$(this.refs.dimmer).dimmer('show');
	}
	renderImages(){
		return this.props.images.map((image,index)=>{
			return <li className='ls-slider-image-block' key={image.public_id}>
				<img onClick={this.imageClickHandler.bind(this)} data-index={index} src={image.url}/>
			</li>
		});
	}
	previousHandler(event){
		let index = Number(this.state.imageIndex)-1;
		let self = this;
		let newState = update(this.state,{
			imageUrl:{
				$set: self.props.images[index].url
			},
			imageIndex:{
				$set: index
			}
		})
		this.setState(newState);
	}
	nextHandler(event){
		let index = Number(this.state.imageIndex)+1;
		let self = this;
		let newState = update(this.state,{
			imageUrl:{
				$set: self.props.images[index].url
			},
			imageIndex:{
				$set: index
			}
		})
		this.setState(newState);
	}
	render(){
		return(
			<div className="ls-image-slider">
				<ul className='ls-slider-image-list'>
					{this.renderImages()}
				</ul>
				<div className="ui page dimmer" ref="dimmer">
					<div className="content">
					    <div className="center">
					    	<div className="ls-dimmer-image-wrapper">
					    		<span className={Number(this.state.imageIndex)===0?'ls-disable ls-dimmer-button ls-dimmer-button-left':'ls-dimmer-button ls-dimmer-button-left'} onClick={this.previousHandler.bind(this)}>
					    			<i className="angle left icon"></i>
					    		</span>
								<img className="ls-dimmer-image" src={this.state.imageUrl}/>
					    		<span className={Number(this.state.imageIndex)===(this.props.images.length-1)?'ls-disable ls-dimmer-button ls-dimmer-button-right':'ls-dimmer-button ls-dimmer-button-right'} onClick={this.nextHandler.bind(this)}>
									<i className="angle right icon"></i>
								</span>
					    	</div>
					    </div>
					</div>
				</div>
			</div>
		);
	}
} 

export default ImageSlider;