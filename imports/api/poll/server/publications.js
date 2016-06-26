import { Meteor } from 'meteor/meteor';
import { Poll } from '../poll.js';


Meteor.publish('poll.last', function() {
    return Poll.find();
});
