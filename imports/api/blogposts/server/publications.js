
import { Meteor } from 'meteor/meteor';
import { Blogposts } from '../blogposts';

Meteor.publish('blogposts', function() {
  	return Blogposts.find();
});

Meteor.publish('blogposts.single', function(blogpostId) {
  	return Blogposts.find(blogpostId);
});