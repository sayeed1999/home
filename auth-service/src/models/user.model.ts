import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { AccountStatus } from "../utils/enums";

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
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: AccountStatus.Active,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
      },
      // when user is sent a email verify url, the token will be saved on db for cross-checking
      email_verification_token: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      phone_verified: {
        type: DataTypes.BOOLEAN,
      },
      // when user is sent a phone verify message, the token will be saved on db for cross-checking
      phone_verification_token: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
      },
      gender: {
        type: DataTypes.TINYINT,
      },
      last_login: {
        type: DataTypes.DATE,
      },
      preferences: {
        type: DataTypes.STRING,
      },
      profile_photo: {
        type: DataTypes.STRING,
      },
      security_question: {
        type: DataTypes.STRING,
      },
      is_banned: {
        type: DataTypes.BOOLEAN,
      },
      country: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true, // adds createdAt and updatedAt timestamps to the model
    }
  );

export { IUser, User, UserStatic };
