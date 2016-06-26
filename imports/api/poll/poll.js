import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Poll = new Mongo.Collection('poll');

Poll.schema = new SimpleSchema({
    date: { type: Date }
});
