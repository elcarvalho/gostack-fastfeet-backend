module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('orders', 'product');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'product', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
