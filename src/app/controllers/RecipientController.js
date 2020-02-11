class RecipientController {
  store(req, res) {
    res.json({ message: 'store' });
  }

  update(req, res) {
    res.json({ message: 'update' });
  }
}

export default new RecipientController();
