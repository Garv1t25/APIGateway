import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ApiError } from "./utils/apiError.js";


dotenv.config({
    path: "./.env",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
    
    
}); 


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});