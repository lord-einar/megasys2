// services/baseService.js
class BaseService {
    constructor(model) {
      this.model = model;
    }
  
    async getAll(orderField = 'nombre', whereCondition = {}) {
      try {
        return await this.model.findAll({
          where: whereCondition,
          order: [[orderField, 'ASC']],
        });
      } catch (error) {
        throw new Error(`Error fetching records: ${error.message}`);
      }
    }
  
    async getById(id) {
      try {
        const record = await this.model.findByPk(id);
        if (!record) throw new Error('Record not found');
        return record;
      } catch (error) {
        throw new Error(`Error fetching record: ${error.message}`);
      }
    }
  
    async create(data) {
      try {
        return await this.model.create(data);
      } catch (error) {
        throw new Error(`Error creating record: ${error.message}`);
      }
    }
  
    async update(id, data) {
      try {
        const record = await this.getById(id);
        return await record.update(data);
      } catch (error) {
        throw new Error(`Error updating record: ${error.message}`);
      }
    }
  
    async delete(id) {
      try {
        const record = await this.getById(id);
        return await record.destroy();
      } catch (error) {
        throw new Error(`Error deleting record: ${error.message}`);
      }
    }
  }
  
  module.exports = BaseService;
  