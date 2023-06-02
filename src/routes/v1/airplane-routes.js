const express = require('express');
const router = express.Router();
const {AirplaneMiddlewares } = require('../../middlewares')
const {AirplaneController} = require('../../controllers')

router.post('/',
               AirplaneMiddlewares.validateCreateRequest            
               ,AirplaneController.createAirplane);

module.exports = router;