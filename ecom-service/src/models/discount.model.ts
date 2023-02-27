import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

interface IDiscount {
  id: number;
  name: string;
  desc: string;
  discount_percent: number;
  active: boolean;
}

interface DiscountModel extends Model<IDiscount>, IDiscount {}

type DiscountStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DiscountModel;
};

const Discount = (sequelize: Sequelize) => <DiscountStatic>sequelize.define(
    "Discounts",
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
      discount_percent: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      deleted_at: {
        type: DataTypes.DATEONLY,
      },
    },
    { timestamps: true }
  );

export { Discount, DiscountStatic };
