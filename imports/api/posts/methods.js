import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Posts } from './posts.js';
import { deleteVideo } from '../videos/methods.js';
import { deleteBlogpost } from '../blogposts/methods.js';


export const insertPost = new ValidatedMethod({
    name: 'posts.insert',
    validate: Posts.schema.validator(),
    run(post) {
        return Posts.insert(post);
    },
});

export const incrementViews = new ValidatedMethod({
    name: 'posts.increment.views',
    validate(postId) {
        if (typeof postId !== 'string') {
            throw new ValidationError(errors);
        }
    },
    run(postId) {
        Posts.update(postId, {
            $inc: { views: 1 }
        });
    },
});


export const editPost = new ValidatedMethod({
    name: 'post.edit',
    validate: new SimpleSchema({
        id: { type: String },
        categories: { type: [String] },
        tags: { type: [String] },
        author: { type: String },
        title: { type: String }
    }).validator(),
    run(post) {
        return Posts.update(post.id, {
            $set: {
                categories: post.categories,
                tags: post.tags,
                author: post.author,
                title: post.title,
                postingDate: new Date(),
                edited: true
            }
        });
    },
});

export const deletePost = new ValidatedMethod({
    name: 'post.delete',
    validate(postId) {
        if (typeof postId !== 'string') {
            throw new ValidationError(errors);
        }
    },
    run(postId) {
        return Posts.update(postId, {
            $set: {
                deleted: true,
                deleteDate: new Date()
            }
        });
    }
});

export const permanentlyDeletePosts = new ValidatedMethod({
    name: 'post.permanentlyDelete',
    validate: null,
    run() {
        const duration = 1000 * 60 * 60 * 24 * 5;
        var now = (new Date()).getTime();
        var posts = Posts.find({
            deleted: true
        }).fetch();
        var oldPosts = posts.filter(function(post) {
            if (now - post.deleteDate.getTime() > duration) {
                return true;
            } else {
                // IMPORTANT! Change to false;
                return true;
            }
        })
        oldPosts.forEach(function(post) {
            if (post.type === 'blog') {
                deleteBlogpost.call(post.dataId, function(err, res) {
                    if (err) {
                        console.log('Error: failed to delete blogpost', err);
                    } else {
                        console.log('Blogpost deleted');
                        Posts.remove(post._id);
                    }
                });
            } else if (post.type === 'youtube') {
                deleteVideo.call(post.dataId, function(err, res) {
                    if (err) {
                        console.log('Error: failed to delete video', err);
                    } else {
                        console.log('Video deleted');
                        Posts.remove(post._id);
                    }
                });
            }
        })
        return;
    }
});

export const recoverPost = new ValidatedMethod({
    name: 'post.recover',
    validate(postId) {
        if (typeof postId !== 'string') {
            throw new ValidationError(errors);
        }
    },
    run(postId) {
        return Posts.update(postId, {
            $set: {
                deleted: false
            }
        });
    }
});
