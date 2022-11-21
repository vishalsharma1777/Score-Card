const mongoose = require("mongoose");

// We will define a schema(database) as shown below
const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    roll: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    english: {
        type: Number,
        required: true
    },
    hindi: {
        type: Number,
        required: true
    },
    maths: {
        type: Number,
        required: true
    },
    science: {
        type: Number,
        required: true
    },
    sst: {
        type: Number,
        required: true
    },
})

// Let us now create a collection
// first create a model
const Submit = new mongoose.model("Submit", studentSchema);

// Now let us export this model
module.exports = Submit;

