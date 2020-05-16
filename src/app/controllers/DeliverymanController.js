import { Op } from 'sequelize';
import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const query = {};

    if (req.query.q) {
      query.name = { [Op.iLike]: `%${req.query.q}%` };
    }

    if (req.params.id) {
      query.id = req.params.id;
    }

    const deliverymen = await Deliveryman.findAll({
      where: query,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: [['id', 'ASC']],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { name, avatar_id, email } = req.body;

    const deliveryman = await Deliveryman.create({ name, avatar_id, email });

    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      avatar_id: Yup.number(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email: newEmail } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists.' });
    }

    if (newEmail && newEmail !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email: newEmail },
      });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists.' });
      }
    }

    const { id, name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists.' });
    }

    await deliveryman.destroy();

    return res.send();
  }
}

export default new DeliveryController();
