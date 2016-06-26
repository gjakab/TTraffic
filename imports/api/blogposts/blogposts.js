import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Blogposts = new Mongo.Collection('blogposts');

let BlogImageSchema = new SimpleSchema({
    format: { type: String },
    public_id: { type: String },
    url: { type: SimpleSchema.RegEx.Url }
});

Blogposts.schema = new SimpleSchema({
    title: { type: String },
    description: { type: String },
    mainImage: { type: BlogImageSchema },
    images: { type: [BlogImageSchema] },
    date: { type: Date }
});
