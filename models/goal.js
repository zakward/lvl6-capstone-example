const mongoose = require('mongoose')
const Schema = mongoose.Schema

const twoWeeksFromNow = new Date(Date.now() + (2 * 7 * 24 * 60 * 60 * 1000)); // Current date + 2 weeks

const goalSchema = new Schema({
    goalName: {
        type: String,
        required: true
    },
    goalDescription: {
        type: String,
    },
    goalDate: {
        type: Date,
        default: twoWeeksFromNow
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});

goalSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 15 }); // Expires 15 days after goalDate

module.exports = mongoose.model('Goal', goalSchema)
