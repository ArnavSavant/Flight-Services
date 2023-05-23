const {Logger} =  require('../config');

class CrudRepository {
	constructor(model) {
		this.model = model;
	}

	async create(data) {
		try {
			const response = await this.model.create(data);
			return response;
		} catch (error) {
			Logger.error("Something went wrong in the CRUD Repo : create");
			throw error;
		}
	}

	async delete(data) {
		try {
			const response = await this.model.destroy({
				where: {
					id: data,
				},
			});
			return response;
		} catch (error) {
			Logger.error("Something went wrong in the CRUD Repo : delete");
			throw error;
		}
	}

	async update(data, id) { // data -> {col:value, .....}
		try {
			const response = await this.model.update(data, {
				where: {
					id: id,
				},
			});
			return response;
		} catch (error) {
			Logger.error("Something went wrong in the CRUD Repo : update");
			throw error;
		}
	}
   
   async get(data) {
      try {
         const response = await this.model.findByPk(data);
         return response;
      } catch (error) {
         Logger.error("Something went wrong in the CRUD Repo : get");
         throw error;
      }
   }

	async getAll() {
		try {
			const response = await this.model.findAll();
			return response;
		} catch (error) {
			Logger.error("Something went wrong in the CRUD Repo : getAll");
			throw error;
		}
	}
}

module.exports = CrudRepository;