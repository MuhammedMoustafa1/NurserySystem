
const { validationResult } = require('express-validator');

module.exports = (request , response , next) => {
    let result = validationResult(request);
    
    if (result.errors.length > 0) {
        let errorMsg = result.errors.reduce(
            (current , item) => current + item.msg + " : " ,
            ""
        );
        let error = new Error(errorMsg);
        error.status = 422;
        next(error);
    }else{
        next();
    }

};