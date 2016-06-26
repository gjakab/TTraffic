import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Posts = new Mongo.Collection('posts');

Posts.schema = new SimpleSchema({
    type: { type: String },
    dataId: { type: String },
    views: { type: Number },
    newPost: { type: Boolean },
    edited: { type: Boolean },
    deleted: { type: Boolean },
    deleteDate: { type: Date },
    author: { type: String },
    categories: { type: [String] },
    tags: { type: [String] },
    postingDate: { type: Date },
    title: { type: String },
    date: { type: Date }
});
