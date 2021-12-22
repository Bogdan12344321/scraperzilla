const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scrapingsSchema = new Schema({
    userInsta: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    followers: {
        type: Number,
        require: true
    },
    following: {
        type: String,
        require: true
    },
    posts: {
        type: Number,
        require: true
    }

}, {
    timestamps: true
});


const Scrapings = mongoose.model('Scrapings', scrapingsSchema);

module.exports = Scrapings;