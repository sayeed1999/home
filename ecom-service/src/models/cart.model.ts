import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

interface ICart {
  id: number;
  product_id: number;
  quantity: number;
}

interface CartModel extends Model<ICart>, ICart { }

type CartStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): CartModel;
};

const Cart = (sequelize: Sequelize) => <CartStatic>sequelize.define(
  "Carts",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

  },
  { timestamps: true }
);

export { Cart, CartStatic };
