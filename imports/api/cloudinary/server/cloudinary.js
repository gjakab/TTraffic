import {Cloudinary} from 'meteor/lepozepo:cloudinary';

if(Meteor.isServer){
	//production credentials
	Cloudinary.config({
		cloud_name: 'dr4gzcoii',
		api_key: '421752723339694',
		api_secret: 'QyOf64HqvOTCmCyo4GobbgZQwLg'
	});

	// Cloudinary.rules["delete"] = function() {
	// 	return this.userId === 'my_user_id';
	// };

	// Cloudinary.rules.signature = function() {
	// 	return this.userId === 'my_user_id';
	// };

	// Cloudinary.rules.private_resource = function() {
	// 	return this.userId === 'my_user_id';
	// };

	// Cloudinary.rules.download_url = function() {
	// 	return this.userId === 'my_user_id';
	// };
}
