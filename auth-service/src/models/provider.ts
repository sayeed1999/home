import { Sequelize } from "sequelize";
import config from "../config";
import { User } from "./user.model";
import { Role } from "./role.model";
import { UserRole } from "./user-role.model";

const database = config.DATABASE_URL;

export class Provider {
  private static instance: Provider;
  private sequelize: Sequelize;

  public User: any;
  public Role: any;
  public UserRole: any;

  private constructor() {
    this.sequelize = new Sequelize(database, {});

    this.User = User(this.sequelize);
    this.Role = Role(this.sequelize);
    this.UserRole = UserRole(this.sequelize);

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
