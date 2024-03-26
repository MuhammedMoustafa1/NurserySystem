const { request, response } = require('express');
const jwt = require('jsonwebtoken');

module.exports = (request , response , next ) => {
    try {
        let token = request.get("authorization").split(" ")[1];
        let decoded = jwt.verify(token , process.env.SECRETKEY);
        request.token = decoded;
        next();
    }catch(error){
        error.message = "Authentication Failed";
        next(error);
    }
}


module.exports.isAdmin = (request , response , next ) => {
    if (request.token.role == "admin"){
        next();
    }else{
        throw new Error ("You don't have permission to access this route");
    }
}

module.exports.isTeacher = (request , response , next ) => {
    if (request.token.role == "teacher"){
        next();
    }else{
        throw new Error ("You don't have permission to access this route");
    }
}