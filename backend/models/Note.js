const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //this is like foreignkey, we're relating notes to user
        ref: 'user' //we're putting reference model (the one to which this will point)
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema); //2 arguemtns are modelname and schema