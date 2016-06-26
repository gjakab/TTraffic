import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const removeUser = new ValidatedMethod({
  	name: 'user.remove',
  	validate(userId){
      if(typeof userId !== 'string'){
        throw new ValidationError({
          name: 'userId',
          type: 'non-string',
          details: {
            value: userId
          }
        })
      }
    },
  	run(userId){
    	return Meteor.users.remove(userId);
  	}
});