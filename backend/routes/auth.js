const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'ThisIsMySecret';

//ROUTE1:
//create a user using: POST "/api/auth/". This doesn't require auth i.e. authentication i.e. user to be logged in
router.post('/createuser',[ //we'll place validations inside this array
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],
 async (req,res)=>{ //req: request, res: response
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

    //check whether the user (email) exists already
    try {
        let user = await User.findOne({email: req.body.email}); //since this is a promise, we need to wait until it's resolved

        if(user){  //is user exists
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt); //secured password is combo of hashing and salt

        //creating a new user if doesn't exist already
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
          })
          
        //   .then(user => res.json(user))
        //   .catch(err=>console.log(err)) 
        //res.json(user)
        //We'll send a token with user id because id is indexed in db, hence info retrieved using it will be retrieved fastest
        const data = {
            user: {
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        //console.log(jwtData);
        res.json({authtoken})   //Whenever a user will signup we'll get a authtoken

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")  
    }

})

//ROUTE2:
//Authenticate a user using: POST "/api/auth/login". This doesn't require auth i.e. authentication i.e. user to be logged in

router.post('/login',[ //we'll place validations inside this array
    body('email', 'Enter a valid email').isEmail(),  //We'll only check email valiation,if email itself isn't valid we won't bother server to check for password etc
    body('Password', 'Password cannot be blank').exists(),
],
 async (req,res)=>{ 
     //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //We'll use destructuring to retrieve password and email from request body
    const{email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){ //if any user with the email entered doesn't exist
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){ //if passwords do not match
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data = { //when user is validated we'll send data
            user: {
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")  
    }
 
})
//ROUTE3: Getting logged in user detail (authentication will be required i.e. user must be logged in)
router.post('/getuser', fetchuser, async (req,res)=>{ //fetchuser is a middleware for logging in 
    //Middleware is a function which will be called whenever login functions are called
    //We'll get user in our request using fetchuser middleware
try {
    userId = req.user.id; //using line 13 of fetchuser
    const user = await User.findById(userId).select("-password");  //select user by ID and 
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}
 })


module.exports = router
