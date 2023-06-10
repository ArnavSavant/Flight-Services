const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const { error } = require("../utils/common/error-response");
const { Op } = require("sequelize");

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

async function getAllFlights(query) {
	let customFilter = {};
	let sortFilter = {};
	const endingTripTime = "23:59:59";
	if(query.trip) {
		[departureAirportId, arrivalAirportId] = query.trip.split('-');
		customFilter.departureAirportId = departureAirportId;
		customFilter.arrivalAirportId = arrivalAirportId;
	}
	if(query.price) {
		[minPrice, maxPrice] = query.price.split('-');
		customFilter.price = {
			[Op.between]:[minPrice,((maxPrice === undefined) ? 20000 : maxPrice)],
		};
	}
	if(query.travellers) {
		customFilter.totalSeats = {
			[Op.gte]: query.travellers,
		};
	}
	if(query.tripDate) {
		customFilter.departureTime = {
			[Op.between]:[query.tripDate,query.tripDate+" "+endingTripTime],
		};
	}
	if(query.sort) {
		const params = query.sort.split(",");
		const sortFilters = params.map((params)=>params.split('_'));
		sortFilter = sortFilters;
	}
	try {
		console.log(customFilter);
		const flights = flightRepository.getAllFlights(customFilter,sortFilter);
		return flights;
	} catch (error) {
		throw new AppError(
			"Cannot Create an Aiprlane Object",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
module.exports = {
	createFlight,
	getAllFlights
};
