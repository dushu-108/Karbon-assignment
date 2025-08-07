import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./models/DBconnect.js";
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
