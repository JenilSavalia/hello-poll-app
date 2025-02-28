import mongoose from "mongoose";





const pollResultSchema = mongoose.Schema({


    poll_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll"
    },
    selected_options: { type: Object, default: {} }, // Object to store option counts
    voted_ips: [{ type: String, required: true, default: [] }]


}, { timestamps: true })




export const PollResult = mongoose.model("Result", pollResultSchema)