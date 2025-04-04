const express = require("express");

const userRoutes = require("./routes/userRoutes")
const cors = require("cors");
const connectDB = require('./config/db')

const app = express();

app.use(express.json());
app.use(cors());

//Database connection


connectDB();

app.use("/api", userRoutes);

app.listen(9004, () => console.log("Server is running on port : 9004"));