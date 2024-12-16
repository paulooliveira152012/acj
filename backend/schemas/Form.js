// import mongoose for mongo mold
const mongoose = require ('mongoose')

// define schema
const iquiryForm = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Inquiry', iquiryForm)