import mongoose from "mongoose";





const userSchema = mongoose.Schema({


    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true
    },

    UserPoll: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]


})




export const User = mongoose.model("User", userSchema)