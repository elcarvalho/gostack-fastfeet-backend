import { Op } from 'sequelize';
import Order from '../models/Order';

class DeliverymanOrderController {
  async index(req, res) {
    const { deliverymanId } = req.params;
    const { page = 1 } = req.query;

    const orders = await Order.findAll({
      where: {
        deliverymanId,
        canceledAt: null,
        endDate: null,
      },
      attributes: [
        'recipientId',
        'deliverymanId',
        'product',
        'canceledAt',
        'startDate',
        'endDate',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: [['id', 'ASC']],
    });

    return res.json(orders);
  }

  async show(req, res) {
    const { deliverymanId } = req.params;
    const { page = 1 } = req.query;

    const orders = await Order.findAll({
      where: {
        deliverymanId,
        endDate: {
          [Op.not]: null,
        },
      },
      attributes: [
        'recipientId',
        'deliverymanId',
        'product',
        'canceledAt',
        'startDate',
        'endDate',
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(orders);
  }
}

export default new DeliverymanOrderController();
