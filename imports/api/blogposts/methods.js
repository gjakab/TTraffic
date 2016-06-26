import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Blogposts } from './blogposts';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

export const insertBlogpost = new ValidatedMethod({
    name: 'blogposts.insert',
    validate: Blogposts.schema.validator(),
    run(blogpost) {
        return Blogposts.insert(blogpost);
    },
});

let BlogImageSchema = new SimpleSchema({
    format: { type: String },
    public_id: { type: String },
    url: { type: SimpleSchema.RegEx.Url }
});

export const editBlogpost = new ValidatedMethod({
    name: 'blogposts.edit',
    validate: new SimpleSchema({
        id: { type: String },
        title: { type: String },
        description: { type: String },
        mainImage: { type: BlogImageSchema },
        images: { type: [BlogImageSchema] }
    }).validator(),
    run(blogposts) {
        return Blogposts.update(blogposts.id, {
            $set: {
                title: blogposts.title,
                description: blogposts.description,
                mainImage: blogposts.mainImage,
                images: blogposts.images
            }
        });
    },
});

export const deleteBlogpost = new ValidatedMethod({
    name: 'blogpost.delete',
    validate: null,
    run(blogpostId) {
        var blogpost = Blogposts.findOne({ _id: blogpostId });
        if (blogpost.images.length) {
            return deleteImages(blogpost.images);
        }
        return Blogposts.remove(blogpostId);
    },
})

function deleteImages(images) {
    images.forEach(function(image) {
        Cloudinary.uploader.destroy(image.public_id, function(res) {
            console.log('Deleting image from Cloudinary: ',res.result);
        })
    })
}
