import { PollResult } from "./Model/PollResult.js"
import { PollDetail } from "./Model/PollDetail.js"
import { User } from "./Model/User.js"
import express from 'express'
import mongoose from "mongoose"

const app = express()
app.use(express.json())

const PORT = 8090;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/", {
            dbName: "Hello_Poll"  //  database name here
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

connectDB();

app.post("/user", async (req, res) => {
    const { Name, Email } = req.body;

    try {
        const user = new User({ Name, Email })
        await user.save()

        res.json({ Status: "User Saved Successfully", User: user })

    } catch (err) {
        res.status(500).json({ Error: err.message });
    }

})




// Create a new poll
app.post('/poll', async (req, res) => {

    const { poll_details, Created_by } = req.body;

    try {
        const NewPoll = new PollDetail({ poll_details, Created_by });
        await NewPoll.save();

        await User.updateOne(
            { _id: NewPoll.Created_by },
            { $addToSet: { UserPoll: NewPoll._id } }
        )

        res.json({ PollId: NewPoll.id })
    } catch (err) {
        res.json({ Error: err })
    }

})


// Get poll informtion
app.get('/poll/:poll_id', async (req, res) => {

    const { poll_id } = req.params;

    try {
        const findPoll = await PollDetail.findById(poll_id)
        res.json({ PollData: findPoll })
    } catch (err) {
        res.json({ Error: err })
    }

})




// Post the vote
app.post('/vote', async (req, res) => {
    const { poll_id, selected_option } = req.body;
    const voted_ip = req.ip;

    // Validate required fields
    if (!poll_id || !selected_option) {
        return res.status(400).json({ error: 'poll_id and selected_option are required' });
    }

    try {
        let result = await PollResult.findOne({ poll_id });

        if (!result) {
            // If no result exists, create a new one
            const newResult = new PollResult({
                poll_id: poll_id,
                selected_option: [selected_option], 
                voted_ips: [voted_ip],
            });

            await newResult.save();
            return res.json({ PollResult: newResult });
        }

        // if (result.voted_ips.includes(voted_ip)) {
        //     return res.status(400).json({ error: 'You have already voted' });
        // }

        result.selected_option.push(selected_option);
        result.voted_ips.push(voted_ip);

        await result.save();

        return res.json({ PollResult: result });
    } catch (err) {
        console.error('Error in /vote:', err);
        return res.status(500).json({ error: 'An error occurred while processing your vote' });
    }
});


// get Poll Result By poll_id






app.listen(PORT, () => {
    console.log(`Listning on port ${PORT}`)
})