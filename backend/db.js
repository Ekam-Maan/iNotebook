const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async() => {
   mongoose.connect(mongoURI).then(console.log("Connected to MongoDB sucessfully"))
}

module.exports = connectToMongo;