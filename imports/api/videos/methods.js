
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Videos } from './videos.js';

export const insertVideo = new ValidatedMethod({
  	name: 'videos.insert',
  	validate: Videos.schema.validator(),
  	run(video) {
    	return Videos.insert(video);
  	},
});


export const editVideo = new ValidatedMethod({
  	name: 'videos.edit',
  	validate:new SimpleSchema({
    	id: { type: String },
    	title: { type: String },
    	description: { type: String }
	}).validator(),
  	run(video) {
    	return Videos.update(video.id, {
    		$set:{
		    	title: video.title,
			    description: video.description
    		}
	  	});
  	},
});

export const deleteVideo = new ValidatedMethod({
    name: 'videos.delete',
    validate: null,
    run(videoId) {
      return Videos.remove(videoId);
    },
})