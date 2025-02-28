import mongoose from "mongoose";





const pollResultSchema = mongoose.Schema({


    poll_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll"
    },
    selected_option: [
        // {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Poll",
        // }
        { type: String, required: true }
    ],
    voted_ips: [{ type: String, required: true }]


}, { timestamps: true })




export const PollResult = mongoose.model("Result", pollResultSchema)