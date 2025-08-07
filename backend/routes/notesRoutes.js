import { Router } from "express";
import { 
    createNote, 
    deleteNote, 
    getNote, 
    getNotes, 
    updateNote 
} from "../controllers/notesController.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// Get all notes for the authenticated user
router.get('/', getNotes);

// Get a single note by ID
router.get('/:id', getNote);

// Create a new note
router.post('/', createNote);

// Update a note
router.put('/:id', updateNote);

// Delete a note
router.delete('/:id', deleteNote);

export default router;