//code for connecting to database
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"

const connectToMongo = () =>{  //mongoose.connect takes 2 parameters: mongoURI and a callback function (here console.log)
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo successfully");
    })
}

module.exports = connectToMongo;