import { Sequelize } from "sequelize";
import config from "../config"


import { Product } from "./product.model"
import { Category } from "./category.model"
import { Cart } from './cart.model'

const database = config.DATABASE_URL;

export class Provider {
  private static instance: Provider;
  private sequelize: Sequelize;

  public Product: any;
  public Category: any;
  public Cart:any;


  private constructor() {
    this.sequelize = new Sequelize(database, {});

    this.Product = Product(this.sequelize);
    this.Category = Category(this.sequelize);
    this.Cart = Cart(this.sequelize);

    this.sequelize
      //.sync({ force: true }) // use this when you need to delete db & again migrate!
      .sync({logging:false})
      .then(() => console.log("# Database successfully instantiated..."))
      .catch((err) => console.log("# Error while instantiating database", err));
  }

  public static getInstance(): Provider {
    if (!Provider.instance) {
      Provider.instance = new Provider();
    }
    return Provider.instance;
  }
}
