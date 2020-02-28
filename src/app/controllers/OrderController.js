import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const { deliverymanId } = req.params;

    const query = deliverymanId ? { where: { deliverymanId } } : {};

    const orders = await Order.findAll(query);

    return res.json(orders);
  }

  async store(req, res) {
    return res.json({ ok: true });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new OrderController();
