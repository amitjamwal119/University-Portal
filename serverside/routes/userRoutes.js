const express = require("express");
const {register , login , getUser , updateUser} = require("../controllers/userController");
const {authmiddleware} = require("../Middleware/userMiddleware")

const router = express.Router();

router.post("/register", register);
router.post("/login" , login);
router.get("/midd", authmiddleware , getUser);
router.put("/edituser", authmiddleware, updateUser);  //update
// router.get('/getuser/:id',getUserByID)


module.exports = router;