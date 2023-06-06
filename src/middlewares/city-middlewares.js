const {StatusCodes} = require('http-status-codes')

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
function validateCreateRequest(req,res,next){
   if(!req.body.name) {
      ErrorResponse.messages = "Something went wrong while creating an city";
      ErrorResponse.error = new AppError(['City Name not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
      return res
               .status(StatusCodes.BAD_REQUEST)
               .json(ErrorResponse);
   }
}

module.exports = {
   validateCreateRequest
}