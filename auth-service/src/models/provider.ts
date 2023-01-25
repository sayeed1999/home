import { Sequelize } from "sequelize";
import { User } from "./user.model";
import config from "../config";

const database = config.DATABASE_URL;

export class Provider {
  private static instance: Provider;
  private sequelize: Sequelize;
  public User: any;

  private constructor() {
    this.sequelize = new Sequelize(database, {});
    this.User = User(this.sequelize);
    this.sequelize
      .sync()
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
