import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

interface IProduct {
  id: number;
  name: string;
  desc: string;
  sku: string;
  price: number;
  product_unit: number;
  category_id: number;
  inventory_id: number;
  discount_id: number;
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
      desc: {
        type: DataTypes.STRING,
      },
      sku: {
        type: DataTypes.STRING,
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
      inventory_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Inventories",
          key: "id",
        },
      },
      discount_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "Discounts",
          key: "id",
        },
      },
    },
    { timestamps: true }
  );

export { Product, ProductStatic };
