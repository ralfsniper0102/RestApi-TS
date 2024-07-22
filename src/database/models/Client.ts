import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

class Client extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare mobilePhone: string;
  declare phone: string;
  declare address: string;
  declare city: string;
  declare state: string;
  declare zip: string;
  declare country: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare createdBy: number;
}

Client.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    mobilePhone: {
      type: sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: sequelize.STRING,
      allowNull: true,
    },
    address: {
      type: sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: sequelize.STRING,
      allowNull: false,
    },
    zip: {
      type: sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: sequelize.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW,
    },
    createdById: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "client",
  }
);

export default Client;