import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    readTime: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        required: true
    }
});

export default mongoose.model('Post', PostSchema);
