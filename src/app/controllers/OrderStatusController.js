import { Op } from 'sequelize';
import Order from '../models/Order';

class OrderStatusController {
  async store(req, res) {
    // TODO: registrar data termino da entrega
  }

  async update(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (order.startDate) {
      return res
        .status(400)
        .json({ error: 'The order delivery already started.' });
    }

    order.startDate = new Date();

    const {
      recipientId,
      deliverymanId,
      product,
      startDate,
    } = await order.save();

    return res.json({
      recipientId,
      deliverymanId,
      product,
      startDate,
    });
  }
}

export default new OrderStatusController();
