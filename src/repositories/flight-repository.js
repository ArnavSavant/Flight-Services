const CrudRepository = require("./crud-repository");

const { Flight, Airplane, Airport, cities } = require("../models");
const { Sequelize } = require("sequelize");

class FlightRepository extends CrudRepository {
	constructor() {
		super(Flight);
	}

	async getAllFlights(filters, sort) {
		const response = await Flight.findAll({
			where: filters,
			order: sort,
			include: [
				{
					model: Airport,
					required: true,
					as: "Departure_Airport",
					on: {
						col1: Sequelize.where(
							Sequelize.col("Flight.departureAirportId"),
							"=",
							Sequelize.col("Departure_Airport.code")
						),
					},
					include: {
						model: cities,
						required: true,
					},
				},
				{
					model: Airport,
					required: true,
					as: "Arrival_Airport",
					on: {
						col1: Sequelize.where(
							Sequelize.col("Flight.arrivalAirportId"),
							"=",
							Sequelize.col("Arrival_Airport.code")
						),
					},
					include: {
						model: cities,
						required: true,
					},
				},
				{
					model: Airplane,
					required: true,
					as: "Airplane_Details",
				},
			],
		});
		return response;
	}
}

module.exports = FlightRepository;
