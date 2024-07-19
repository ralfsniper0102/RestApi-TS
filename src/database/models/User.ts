import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "user",
    timestamps: false,
  }
);

export default User;
