module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('delivery_problems', ['order_id'], {
      type: 'foreign key',
      name: 'delivery_problems_order_id_fkey',
      references: {
        table: 'orders',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint(
      'delivery_problems',
      'delivery_problems_order_id_fkey'
    );
  },
};
