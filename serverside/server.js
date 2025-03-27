const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

//Database connection
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Studentscollection");
        console.log("Database Connected Successfully !!!")
    }
    catch (err) {
        console.log("Error Connecting Database!", err)
    }
}

connectDB();

//Database connection
// mongoose.connect("mongodb://localhost:27017/Studentscollection")      //Databasename
// .then(() => console.log("Database Connected Successfully !!!"))
// .catch((err) => console.log("Error Connecting Database!" , err));

app.use("/api", userRoutes);

app.listen(9004, () => console.log("Server is running on port : 9003"));