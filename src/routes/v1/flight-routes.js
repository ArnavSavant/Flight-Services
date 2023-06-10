const express = require("express");
const router = express.Router();
const { FlightMiddlewares } = require("../../middlewares");
const { FlightController } = require("../../controllers");

//api/v1/airports POST
router.post(
	"/",
	FlightMiddlewares.validateCreateRequest,
	FlightMiddlewares.validateTime,
	FlightController.createFlight
);

//api/v1/airports/?{query-params} GET
router.get("/", FlightController.getAllFlights);

// // api/v/airports/:id GET
// router.get("/:id", AirportController.getAirport);

// // api/v/airports/:id DELETE
// router.delete("/:id", AirportController.destroyAirport);

// // api/v/airports/:id PATCH
// router.patch(
// 	"/:id",
// 	AirportMiddlewares.validateUpdateRequest,
// 	AirportController.updateAirport
// );

module.exports = router;
