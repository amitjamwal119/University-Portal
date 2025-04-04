const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Registration logic:

// Receives user data from React form.
//Hashes password using bcrypt.
//Stores user in MongoDB.

const register = async (req, res) => {
  const { name, semester, rollno, phoneno, email, password } = req.body;

  try {
    //hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    const newUser = await UserModel.create({
      name,
      semester,
      rollno,
      phoneno,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error registring user", error: err.message });
  }
};

//Login Logic :
//Validates user email and password.
//Generates JWT token for authentication.

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
 
 
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    //To create jsonwebtoken
    const token = jwt.sign({ id: user._id }, "secretcode");

    //Send success response with token
    res.json({ message: "Login Successful", token });
  } catch (err) {
    return res.status(500).json({ message: "server error (login catch)", err });
  }
};

//Middleware logic to check does
//Fetches user details by ID.

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Error Getting user", err });
  }
};

// update logic
const updateUser = async (req, res) => {
  try {


    const userId = req.user.id;
    const { name, semester, rollno, phoneno, email, password } = req.body;
        // console.log("reeeeee",req.body)


        //For hashing password
    let updatedFields = { name, semester, rollno, phoneno, email, password };

    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }
    
    // Find and update user
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      updatedFields, {
      new: true,
      runValidators: true,
    });
  
    // console.log(updateUser);

    if (!updateUser) {
      return res.status(404).json({ message: "user not found or updated" });
    }
    res.status(200).json({message: "User updated Successfully", updateUser })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





module.exports = { register, login, getUser, updateUser };
