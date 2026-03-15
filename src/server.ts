import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
    console.log("app running...");
})