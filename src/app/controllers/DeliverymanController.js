import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliveryController {
  async index(req, res) {
    return res.json({ ok: true });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, avatar_id, email } = req.body;

    const deliveryman = await Deliveryman.create({ name, avatar_id, email });

    return res.json(deliveryman);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new DeliveryController();
