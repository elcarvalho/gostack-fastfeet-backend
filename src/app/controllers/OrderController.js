import { Op } from 'sequelize';
import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import Mail from '../../lib/Mail';

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const query = req.query.q
      ? { name: { [Op.iLike]: `%${req.query.q}%` } }
      : {};

    const orders = await Order.findAll({
      attributes: ['recipientId', 'canceledAt', 'startDate', 'endDate'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip',
          ],
          where: query,
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url', 'name'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipientId: Yup.number().required(),
      deliverymanId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { recipientId } = req.body;

    const { deliverymanId, product } = await Order.create(req.body);

    const { name, email } = await Deliveryman.findByPk(deliverymanId);

    try {
      Mail.sendMail({
        to: `${name} <${email}>`,
        subject: 'Nova encomenda aguardando retirada',
        html: `<p>Cliente: ${name}</p><p>Produto: ${product}</p><p>Fastfeet co.</p>`,
      });
    } catch (error) {
      console.log(error);
    }

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

    if (order.canceledAt) {
      return res.json({ error: 'The order already canceled.' });
    }

    order.canceledAt = new Date();

    await order.save();

    const { name, email } = await Deliveryman.findByPk(order.deliverymanId);

    try {
      Mail.sendMail({
        to: `${name} <${email}>`,
        subject: 'Encomenda cancelada',
        html: `<p>Cliente: ${name}</p>
              <p>Produto: ${order.product}</p>
              <p>Data/hora: ${format(
                order.canceledAt,
                "'dia' dd 'de' MMMM', às' H:mm'h'",
                {
                  locale: pt,
                }
              )}</p>
              <p>Fastfeet co.</p>`,
      });
    } catch (error) {
      console.log(error);
    }

    return res.json(order);
  }
}

export default new OrderController();
