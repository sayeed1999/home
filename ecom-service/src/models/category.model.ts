import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

interface ICategory {
  id: number;
  name: string;
}

interface CategoryModel extends Model<ICategory>, ICategory {}

type CategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoryModel;
};

const Category = (sequelize: Sequelize) => <CategoryStatic>sequelize.define(
    "Categories",
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

export { Category, CategoryStatic };
