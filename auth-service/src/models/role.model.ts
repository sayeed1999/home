import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

interface IRole {
  id: number;
  name: string;
}

interface RoleModel extends Model<IRole>, IRole {}

type RoleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RoleModel;
};

const Role = (sequelize: Sequelize) => <RoleStatic>sequelize.define(
    "Roles",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: true }
  );

export { Role, RoleStatic };
