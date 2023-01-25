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

const User = (sequelize: Sequelize) => <UserStatic>sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
    },
  });

export { User, UserStatic };
