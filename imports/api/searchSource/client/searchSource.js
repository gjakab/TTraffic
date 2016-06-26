import {SearchSource} from 'meteor/meteorhacks:search-source'; 

var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

let fields = ['type'];

//export const YoutubeSearchSource = new SearchSource('posts', fields, options);

export const BlogSearchSource = new SearchSource('postsa', fields, options);


