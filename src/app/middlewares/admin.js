import User from '../models/User';

export default async (req, res, next) => {
  const user = await User.findByPk(req.userId);

  if (!user.isAdmin) {
    return res.status(401).json({ error: 'Operation not permited.' });
  }

  return next();
};
