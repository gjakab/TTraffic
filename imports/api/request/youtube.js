import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

export const youtubeRequest = function(videoId, ck) {
    let YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics,recordingDetails&key=AIzaSyA_ltEFFYL4E_rOBYkQtA8aKHnL5QR_uMA`;

    HTTP.call('GET', YOUTUBE_API_URL, function(err, response) {
        if (!err) {
            if (response.statusCode == '200' && response.data && response.data.items.length) {
                if(response.data.items.length){
                	ck(null, response.data.items[0]);
                }
                else{
                	ck(new Error('The video link is incorrect'));
                }
            }
            else{
            	ck(new Error('Failed to get the video'));
            }
        } else {
        	ck(new Error('Failed to get the video'));
            if (Debug) {
                console.log(err)
            }
        }
    })
}
