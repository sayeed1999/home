import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

interface IInventory {
  id: number;
  quantity: number;
}

interface InventoryModel extends Model<IInventory>, IInventory {}

type InventoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): InventoryModel;
};

const Inventory = (sequelize: Sequelize) => <InventoryStatic>sequelize.define(
    "Inventories",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATEONLY,
      },
    },
    { timestamps: true }
  );

export { Inventory, InventoryStatic };
