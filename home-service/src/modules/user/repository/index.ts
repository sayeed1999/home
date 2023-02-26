import { Model } from "mongoose";
import { IUser } from "../../../models/user.model";
import BaseRepository, { IBaseRepository } from "../../base/repository";
import Provider from "../../../models/provider";
const db = Provider.getInstance();

export interface IUserRepository extends IBaseRepository<IUser> {
  // add any specific methods for user repository
}

class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  // Note: use it if you're using Dependency Injection
  // constructor(model: Model<IUser>) {
  //   super(model);
  // }

  // Note: use it if you're not using Dependency Injection
  constructor() {
    super(db.User);
  }
}

// exporting a single instance
const instance = new UserRepository();
export default instance;
