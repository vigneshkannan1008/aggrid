const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://kvignesh1008:MTDry9FYWdgKi0ou@cluster0.e9a2vuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log(`mongoDB is connected to the server`);
    } catch (err) {
        console.log('mongoDB connection failed', err.message);
    }
}

module.exports = connectDB;