import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts.js';

Posts._ensureIndex({
    "title": "text"
});

Meteor.publish('posts.private.posted', function(options) {
    return Posts.find({
        edited: true,
        deleted: false
    }, options);
});

Meteor.publish('posts.private.deleted', function(options) {
    return Posts.find({
        deleted: true
    }, options);
});

Meteor.publish('posts.private.deals', function(options) {
    return Posts.find({
        categories: 'deals',
        deleted: false
    }, options);
});

Meteor.publish('posts.private', function(options) {
    return Posts.find({
        edited: false,
        deleted: false
    }, options);
});

Meteor.publish('posts.public', function(searchValue) {
    if (!searchValue) {
        return Posts.find({
            edited: true,
            deleted: false
        });
    }
    return Posts.find({
        $text: { $search: searchValue },
        edited: true,
        deleted: false
    })
});

Meteor.publish('posts.private.single', function(postId) {
    return Posts.find(postId);
});

Meteor.publish('posts.public.single', function(postId) {
    return Posts.find(postId);
});
