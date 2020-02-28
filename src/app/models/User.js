import bcrypt from 'bcryptjs';

import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        passwordHash: Sequelize.STRING,
        isAdmin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }
}

export default User;
