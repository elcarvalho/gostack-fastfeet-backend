import * as Yup from 'yup';
import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const { deliverymanId } = req.params;

    const query = deliverymanId
      ? { deliverymanId, canceledAt: null }
      : { canceledAt: null };

    const orders = await Order.findAll({ where: query });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipientId: Yup.number().required(),
      deliverymanId: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { recipientId } = req.body;

    const order = await Order.findOne({ where: { recipientId } });

    if (order) {
      return res.status(400).json({ error: 'The order was assigned already.' });
    }

    const { deliverymanId, product } = await Order.create(req.body);

    // TODO: notificar entregador por e-mail

    return res.json({ recipientId, deliverymanId, product });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliverymanId: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const order = await Order.findByPk(id);

    const { deliverymanId, product } = await order.update(req.body);

    return res.json({ deliverymanId, product });
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    order.canceledAt = new Date();

    await order.save();

    // TODO: Informar entregador por e-mail sobre o cancelamento

    return res.json(order);
  }
}

export default new OrderController();
