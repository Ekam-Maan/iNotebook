const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://root:root@cluster0.2bjrxxq.mongodb.net/";

const connectToMongo = async() => {
   mongoose.connect(mongoURI).then(console.log("Connected to MongoDB sucessfully"))
}

module.exports = connectToMongo;