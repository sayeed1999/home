import { Model } from "mongoose";
import userModel, { IUser } from "./user.model";

export default class Provider {
  private static instance: Provider;
  public User: Model<IUser>;

  private constructor() {
    this.User = userModel;
  }

  public static getInstance(): Provider {
    if (!Provider.instance) {
      Provider.instance = new Provider();
    }
    return this.instance;
  }
}
