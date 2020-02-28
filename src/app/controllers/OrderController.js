import * as Yup from 'yup';
import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const { deliverymanId } = req.params;

    const query = deliverymanId ? { where: { deliverymanId } } : {};

    const orders = await Order.findAll(query);

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
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new OrderController();