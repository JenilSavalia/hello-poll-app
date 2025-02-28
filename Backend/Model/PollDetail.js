import mongoose from "mongoose";





const pollSchema = mongoose.Schema({

    poll_details: {
        poll_title: { type: String, required: true },
        poll_options: [{ type: String, required: true }],
        oneVotePerIP: { type: String, required: true }
    },

    poll_result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    },

    Created_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]


}, { timestamps: true })




export const PollDetail = mongoose.model("Poll", pollSchema)