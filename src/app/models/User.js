import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        is_admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;