var jwt = require('jsonwebtoken');
const JWT_SECRET = 'ThisIsMySecret';


const fetchuser = (req, res, next) =>{ //Middleware takes request, response and next, middleware upon execution will call the next function
    //Get the user from JWT TOken and add id to request object
    const token = req.header('auth-token'); //we're naming header as auth token
    if(!token){ //if token is absent we'll send a bad response (error message)
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; //we'll store user ka data in request
        next();
    }   
     catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}

module.exports = fetchuser;