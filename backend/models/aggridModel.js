const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    regNo: {
        type: Number,
        trim: true,
        unique: true
    },
    dob: {
        type: String,
        trim: true
    },
    clg: {
        type: String,
        trim: true
    },
    dept: {
        type: String,
        trim: true
    },
    year: {
        type: Number,
        trim: true
    },
    fees: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            courseId: { type: String, required: true },
            courseName: { type: String, required: true }
        }
    ]
});

const users = mongoose.model('user', userSchema);

module.exports = users;