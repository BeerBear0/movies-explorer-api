const mongoose = require('mongoose');


const moviesSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return /^https?:\/\/(w{3}\.)?[a-z0-9-]{1,}\.\w{2,4}[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*/.test(v);
            },
        },
    },
    thumbnail: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return /^https?:\/\/(w{3}\.)?[a-z0-9-]{1,}\.\w{2,4}[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*/.test(v);
            },
        },
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movieId: {
        type: mongoose.Types.ObjectId,
        ref: 'movie',
        required: true,
    },
    nameRu: {
        type: String,
        required: true,
    },
    nameEn: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('movies',moviesSchema);