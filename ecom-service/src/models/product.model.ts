import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

interface IProduct {
  id: number;
  name: string;
  description: string;
  category_id: number;
}

interface ProductModel extends Model<IProduct>, IProduct {}

type ProductStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductModel;
};

const Product = (sequelize: Sequelize) => <ProductStatic>sequelize.define(
    "Products",
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
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      product_unit: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    { timestamps: true }
  );

export { Product, ProductStatic };
