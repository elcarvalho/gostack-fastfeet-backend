module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('orders', ['signature_id'], {
      type: 'foreign key',
      name: 'orders_signature_id_fkey',
      references: {
        table: 'files',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint('orders_signature_id_fkey');
  },
};
