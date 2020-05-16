import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['product'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: [['id', 'ASC']],
    });

    return res.json(problems);
  }

  async show(req, res) {
    const { order_id } = req.params;

    const { page = 1 } = req.query;

    const problems = await DeliveryProblem.findAll({
      where: { order_id },
      attributes: ['description'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['product'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { order_id } = req.params;
    const { description } = req.body;

    const { id } = await DeliveryProblem.create({ order_id, description });

    return res.json({ id });
  }
}

export default new DeliveryProblemController();
