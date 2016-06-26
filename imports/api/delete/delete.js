import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts/posts.js';
import { permanentlyDeletePosts } from '../posts/methods.js';

export const Delete = function() {
    permanentlyDeletePosts.call();
}


const interval = 24 * 60 * 60 * 1000;

Meteor.setInterval(() => {
    Delete();
}, interval);
