import { IUser } from "../../../models/user.model";
import CustomError from "../../../utils/errors/custom-error";
import BaseService, { IBaseService } from "../../base/services";
import userRepository from "../repository";

export interface IUserService extends IBaseService<IUser> {}

class UserService extends BaseService<IUser> implements IUserService {
  constructor() {
    super(userRepository);
  }
}

export default new UserService();
