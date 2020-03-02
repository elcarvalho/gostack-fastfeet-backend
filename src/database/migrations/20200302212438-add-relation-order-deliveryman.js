module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('orders', ['deliveryman_id'], {
      type: 'foreign key',
      name: 'orders_deliveryman_id_fkey',
      references: {
        table: 'deliverymen',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint(
      'orders',
      'orders_deliveryman_id_fkey'
    );
  },
};
