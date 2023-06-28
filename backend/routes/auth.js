const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();

const JWT_KEY = "adsk984^g3$#3rfef23";

// ROUTE-1 POST request at "/api/auth/createUser" to create a new User. (No Login Required)
router.post(
  "/createUser",
  [
    body("name", "please enter min 2 characters").isLength({ min: 2 }),
    body("email", "please enter a valid email").isEmail(),
    body(
      "password",
      "your password is too small (should be atleast 5 chars)"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // validating the feilds
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success, errors: error.array() });
    }
    try {
      // checking if the email is already in use.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ success, error: "This email is already registered." });
      } else {
        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // create new user in the database
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });

        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, JWT_KEY);
        success = true;
        res.json({ success, authToken });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({success, error: error.message});
    }

    // .then(user => res.send("User Created Successfully!"))
    //   .catch(err =>{console.log(err);
    //                 res.json({error: "This email is alredy registered", meg : err.message})});
  }
);

//ROUTE-2 POST request at '/api/auth/login' to login (No Login Required)
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "please enter your password").isLength({min : 4})
  ],
  async (req, res) => {
   // validating the feilds
   const error = validationResult(req);
   let success = false;
   
   if (!error.isEmpty()) {
     return res.status(400).json({success, errors: error.array() });
   }
    try {
      const user = await User.findOne({email: req.body.email });

      if (!user) {
        return res.status(400).json({success, error: "Please enter correct credentials"});
      }

      const hashedPassword = user.password;
      const passwordMatched = await bcrypt.compare(
        req.body.password,
        hashedPassword
      );


      if (!passwordMatched) {
        return res.status(400).json({success, error: "Please enter correct credentials"});
      }

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_KEY);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success, error: error.message});
    }
  }
);

//ROUTE-3 POST request at '/api/auth/getUser' to get user with auth token (Login Required)
router.post('/getUser', fetchUser, async (req,res) =>{
    try {
        userId =req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Some internal error occured");
    }
});

module.exports = router;
