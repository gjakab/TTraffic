import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Videos = new Mongo.Collection('videos');

Videos.schema = new SimpleSchema({
    title: { type: String },
    description: { type: String },
    videoLink: { type: SimpleSchema.RegEx.Url },
    imageLink: { type: String },
    videoId: { type: String },
    channelId: { type: String },
    channelTitle: { type: String },
    date: { type: Date }
});

