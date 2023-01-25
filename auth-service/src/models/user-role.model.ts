import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

interface IUserRole {
  id: number;
  user_id: string;
  role_id: string;
}

interface UserRoleModel extends Model<IUserRole>, IUserRole {}

type UserRoleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserRoleModel;
};

const UserRole = (sequelize: Sequelize) => <UserRoleStatic>sequelize.define(
    "UserRoles",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      role_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
      },
    },
    { timestamps: true }
  );

export { UserRole, UserRoleStatic };
