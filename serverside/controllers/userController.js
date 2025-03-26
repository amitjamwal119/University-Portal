const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken")

//Registration logic
const register = async (req, res) => {
  const { name, semester, rollno, phoneno, email, password } = req.body;
    // console.log(req.body); Check what data is being received

    try{

        //hash password using bcrypt
       const hashedPassword = await bcrypt.hash(password, 10)
      //  console.log("passsssss",hashedPassword)

       //Create new user
      const newUser = await UserModel.create({
        name,
        semester,
        rollno,
        phoneno,
        email,
        password: hashedPassword,
      })
// console.log("mewww usreee",newUser)
      return res.status(201).json({ message: "User registered successfully", user: newUser})
    }
    catch (err){
      return res.status(500).json({message: "Error registring user", error : err.message})
    }
};

//Login Logic
const login = async (req, res) => {
  

  try{
    
    const { email, password } = req.body;
    const user = UserModel.findOne({ email });

    if(!user){
        res.json({ message: "User not found" })
    }

    const isMatch = bcrypt.compare(password, user.password)
    if(!isMatch){
      res.json({ message: "Invalid Credentials" });
      return;
    }
    //To create jsonwebtoken
    const token = jwt.sign({ id: user._id }, 'secretcode')

    //Send success response with token
    res.json( {message: "Login Successful", token} )
  }


  catch(err){
    return res.status(500).json({message:"server error (login catch)", err})
  }

}

module.exports = { register , login };
