const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
    name:{type : String , required : true},
    semester:{type : String , required : true},
    rollno:{type : String , required : true},
    phoneno:{type : String , required : true},
    email:{type : String , required : true , unique : true},
    password:{type : String , required : true}
});


const UserModel = mongoose.model("students", studentsSchema);       //Students is model/file in database name

module.exports = UserModel;