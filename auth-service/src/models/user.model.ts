import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  emailVerified?: boolean;
}

interface UserModel extends Model<IUser>, IUser {}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

const User = (sequelize: Sequelize) => <UserStatic>sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // hashed password using salt
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // salt used to hash password
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
      },
    },
    { timestamps: true }
  );

export { IUser, User, UserStatic };
