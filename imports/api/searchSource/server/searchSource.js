import { SearchSource } from 'meteor/meteorhacks:search-source';
import { Posts } from 'meteor/meteorhacks:search-source';

SearchSource.defineSource('postsa', function(searchText, options) {
    var options = {};

    if (searchText) {
        var regExp = buildRegExp(searchText);
        var selector = {
            $or: [
                { type: regExp }
            ]
        };

        return Posts.find(selector, options).fetch();
    } else {
        return Posts.find({}, options).fetch();
    }
});

function buildRegExp(searchText) {
    // this is a dumb implementation
    var parts = searchText.trim().split(/[ \-\:]+/);
    return new RegExp("(" + parts.join('|') + ")", "ig");
}