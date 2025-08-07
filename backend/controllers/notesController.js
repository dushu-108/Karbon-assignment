import Notes from "../models/notes.js";

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Notes.create({
            title,
            content,
            user_id: req.user._id 
        });
        res.status(201).json(note);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Failed to create note', error: error.message });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user_id: req.user._id });
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Failed to fetch notes', error: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const note = await Notes.findOne({
            _id: req.params.id,
            user_id: req.user._id // Ensure the note belongs to the user
        });
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.status(200).json(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ message: 'Failed to fetch note', error: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Notes.findOneAndUpdate(
            {
                _id: req.params.id,
                user_id: req.user._id 
            },
            { title, content, updated_at: Date.now() },
            { new: true, runValidators: true }
        );
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.status(200).json(note);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Failed to update note', error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await Notes.findOneAndDelete({
            _id: req.params.id,
            user_id: req.user._id 
        });
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Failed to delete note', error: error.message });
    }
};