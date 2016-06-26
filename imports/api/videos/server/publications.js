
import { Meteor } from 'meteor/meteor';
import { Videos } from '../videos.js';

Meteor.publish('videos', function() {
  	return Videos.find();
});

Meteor.publish('videos.single', function(videoId) {
  	return Videos.find(videoId);
});
