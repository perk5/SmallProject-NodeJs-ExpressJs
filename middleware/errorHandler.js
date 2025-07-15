const {constants} = require('../constants')


const errorHandler = (error, req, res, next) => {
    const statusCode = res.status ? res.statusCode : 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "VALIDATION_ERROR",
                message: error.message, 
                stackTrace: error.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "NOT_FOUND",
                message: error.message, 
                stackTrace: error.stack
            })
        case constants.UNAUTHORISED:
        res.json({
            title: "UNAUTHORISED",
            message: error.message, 
            stackTrace: error.stack
        })
        case constants.FORBIDDEN:
        res.json({
            title: "FORBIDDEN",
            message: error.message, 
            stackTrace: error.stack
        })
        case constants.SERVER_ERROR:
        res.json({
            title: "SERVER_ERROR",
            message: error.message, 
            stackTrace: error.stack
        })
        default:
            console.log("No Error! All Good..!")
        break;
    }
    
}

module.exports = errorHandler

