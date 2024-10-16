import express from "express";
import cors from "cors";
// import dotenv from "dotenv"

requiere('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get("/", (req,res) => {
    res.send("API is running")
})

export default app;


