import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    user_id: String,
    title: String,
    content: String,
    created_at: Date,
    updated_at: Date
})

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
