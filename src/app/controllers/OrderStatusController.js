import { startOfToday, getHours } from 'date-fns';
import { Op } from 'sequelize';
import Order from '../models/Order';
import File from '../models/File';

class OrderStatusController {
  async store(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    const hourNow = getHours(new Date());

    if (hourNow < 8 || hourNow > 18) {
      return res.status(400).json({
        error: 'Orders can be withdrawn only in business hours.',
      });
    }

    if (req.userId !== order.deliverymanId && !req.isAdmin) {
      return res.status(400).json({ error: 'Not permitted!' });
    }

    if (order.startDate) {
      return res
        .status(400)
        .json({ error: 'The order delivery already started.' });
    }

    const orders = await Order.findAll({
      where: {
        deliverymanId: order.deliverymanId,
        startDate: {
          [Op.between]: [
            startOfToday().setUTCHours(0, 0, 0),
            startOfToday().setUTCHours(23, 59, 59),
          ],
        },
      },
    });

    if (orders.length >= 5) {
      return res.status(400).json({
        error: 'The limit of withdrawal orders per day has been reached.',
      });
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

  async update(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order.startDate) {
      return res.status(400).json({ error: 'Order not started yet!' });
    }

    if (req.file) {
      const { originalname: name, filename: path } = req.file;
      const file = await File.create({ name, path });
      order.signatureId = file.id;
    }

    order.endDate = new Date();

    const { endDate } = await order.save();

    return res.json({ endDate });
  }
}

export default new OrderStatusController();
