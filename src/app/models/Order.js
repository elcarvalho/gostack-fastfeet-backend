import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        recipientId: Sequelize.INTEGER,
        deliverymanId: Sequelize.INTEGER,
        signatureId: Sequelize.INTEGER,
        canceledAt: Sequelize.DATE,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliverymanId',
      as: 'deliveryman',
    });

    this.belongsTo(models.Recipient, {
      foreignKey: 'recipientId',
      as: 'product',
    });

    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Order;
