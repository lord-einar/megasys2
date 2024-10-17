const dbHelpers = {
    findAllOrdered: async (model, orderField = 'nombre', whereCondition = {}) => {
      try {
        return await model.findAll({
          where: whereCondition,
          order: [[orderField, 'ASC']],
        });
      } catch (error) {
        throw new Error(`Error fetching ${model.name}: ${error.message}`);
      }
    },
  };
  
  module.exports = dbHelpers;
  