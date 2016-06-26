import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/posts/posts';
import { Poll } from '../../api/poll/poll';
import { Videos } from '../../api/videos/videos';
import { Blogposts } from '../../api/blogposts/blogposts';

if (!Meteor.users.find().count()) {
    Accounts.createUser({
        username: 'vracha',
        password: '_6fAk9Jv/Sxu=Ka',
        profile: {
        	access: 'admin'
        }

    });
}

if(!Poll.find().count()){
	Poll.insert({
		date: new Date()
	});
}

