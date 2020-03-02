import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        recipientId: Sequelize.INTEGER,
        deliverymanId: Sequelize.INTEGER,
        signatureId: Sequelize.INTEGER,
        product: Sequelize.STRING,
        canceledAt: Sequelize.DATE,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }
}

export default Order;
