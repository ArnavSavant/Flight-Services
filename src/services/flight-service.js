const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const { error } = require("../utils/common/error-response");

const flightRepository = new FlightRepository();

async function createFlight(data) {
	try {
		const flight = await flightRepository.create(data);
		return flight;
	} catch (error) {
		if (error.name == "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Cannot Create a Flight Object",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createFlight,
};
