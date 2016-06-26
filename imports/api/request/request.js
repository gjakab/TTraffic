import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Videos } from '../videos/videos.js';
import { Poll } from '../poll/poll.js';
import { insertVideo } from '../videos/methods.js';
import { Posts } from '../posts/posts.js';
import { insertPost } from '../posts/methods.js';

const interval = 30 * 60 * 1000;
const channels = [
    'TNews',
    'V6NewsTelugu',
    'Ntvteluguhd',
    'abntelugutv',
    'Tv9telugulive',
    'TV5newschannel',
    'CVRNewsOfficial',
    '6tv',
    '6tvtelangana',
    'Inews',
    'sakshinews',
    'HMTV',
    'timesnowonline',
    'MangoNews',
    'Teluguone',
    'idlebrainlive',
    'oneindianews',
    'TimesOfIndiaChannel',
    'TeluguMovieBazaar',
    'AssociatedPress',
    'abpnewstv',
    'iDreamSuperSlider'
];

const prefix = '/watch?v=';

export const Request = function(channel) {

    LastPoll = new Date();

    let API_URL = `https://api.import.io/store/connector/5b848e5d-b1d1-40a4-afad-95be3428a641/_query?input=webpage/url:https%3A%2F%2Fwww.youtube.com%2Fuser%2F${channel}%2Fvideos%3Fflow%3Dlist%26view%3D0%26sort%3Ddd%26live_view%3D500&&_apikey=a8d6274788de469a86774169bf4d61fc86e8fd91b21ed222fb567414ad0b296bd9ea9ebf0d0ab2132ffdfb316d99cd61bd7b1d2d9f535a6077686e13363c2deec23f3d4ba5df0ecd623d6e4c1a32fa76`;

    let latestVideo = Videos.findOne({
        channelTitle: channel
    }, {
        sort: {
            date: -1
        }
    });

    let latestPost;

    if (latestVideo) {
        latestPost = Posts.findOne({
            dataId: latestVideo._id
        });
    }

    HTTP.call('GET', API_URL, function(err, response) {
        if (!err) {
            if (response.statusCode == '200' && response.data && response.data.results) {
                response.data.results.forEach(function(result, index, arr) {
                    if (result['video_link/_source'].startsWith(prefix)) {
                        let videoId = result['video_link/_source'].substring(prefix.length);
                        let YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics,recordingDetails&key=AIzaSyA_ltEFFYL4E_rOBYkQtA8aKHnL5QR_uMA`;

                        HTTP.call('GET', YOUTUBE_API_URL, function(err, response) {

                            if (!err) {
                                if (response.statusCode == '200' && response.data) {
                                    var item = response.data.items[0];
                                    let date = new Date(item.snippet.publishedAt);
                                    var singleVideo = {
                                        title: item.snippet.title,
                                        description: item.snippet.description,
                                        videoLink: result['video_link'],
                                        imageLink: (item.snippet.thumbnails.standard && item.snippet.thumbnails.standard.url) || (item.snippet.thumbnails.default && item.snippet.thumbnails.default.url) || 'default',
                                        videoId: item.id,
                                        channelId: item.snippet.channelId,
                                        channelTitle: channel,
                                        date: date
                                    };
                                    var singlePost = {
                                        type: 'youtube',
                                        views: 0,
                                        newPost: true,
                                        edited: false,
                                        deleted: false,
                                        deleteDate: new Date(),
                                        categories: [],
                                        author: 'bot',
                                        tags: item.snippet.tags || [],
                                        postingDate: new Date(),
                                        title: item.snippet.title,
                                        date: date
                                    };
                                    if (latestPost) {
                                        if (date.getTime() > latestPost.date.getTime()) {
                                            //console.log(date.getTime(), latestPost.date, 'New post added');
                                            singlePost.dataId = insertVideo.call(singleVideo);
                                            insertPost.call(singlePost);
                                        } else {
                                            //console.log(date.getTime(), latestPost.date, 'old');
                                        }
                                    } else {
                                        //console.log('all new');
                                        singlePost.dataId = insertVideo.call(singleVideo);
                                        insertPost.call(singlePost);
                                    }
                                }
                            } else {
                                if (Debug) {
                                    console.log(err)
                                }
                            }
                        })
                    }
                })
            } else {
                console.log(response);
            }
        } else {
            console.log(err);
        }
    });
}



function makeRequest(channels) {
    Posts.update({
        newPost: true
    }, {
        $set: {
            newPost: false
        }
    }, {
        multi: true
    });
    channels.forEach((channel) => Request(channel));
    Poll.update({},{
        $set:{
            date: new Date()
        }
    });
}

//makeRequest(channels);

Meteor.setInterval(() => {
    makeRequest(channels);
}, interval);
