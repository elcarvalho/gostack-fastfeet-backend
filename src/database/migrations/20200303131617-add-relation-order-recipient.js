module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('orders', ['recipient_id'], {
      type: 'foreign key',
      name: 'orders_recipient_id_fkey',
      references: {
        table: 'recipients',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint(
      'orders',
      'orders_recipient_id_fkey'
    );
  },
};
