import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;

      const query = {};

      if (req.query.q) {
        query.name = { [Op.iLike]: `%${req.query.q}%` };
      }

      if (req.params.id) {
        query.id = req.params.id;
      }

      const recipients = await Recipient.findAll({
        attributes: [
          'id',
          'name',
          'street',
          'number',
          'complement',
          'state',
          'city',
          'zip',
        ],
        where: query,
        limit: 20,
        offset: (page - 1) * 20,
        order: [['id', 'ASC']],
      });

      return res.json(recipients);
    } catch (error) {
      return res.status(500).json({ error: 'List recipients fail.' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, street, number, complement, state, city, zip } = req.body;

    const recipient = await Recipient.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    });

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not exists' });
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    });
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not exists.' });
    }

    await recipient.destroy();

    return res.send();
  }
}

export default new RecipientController();
