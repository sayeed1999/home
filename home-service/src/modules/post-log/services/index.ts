import { IPostLog } from "../../../models/post-log.model";
import BaseService, { IBaseService } from "../../base/services";
import postLogRepository from "../repository";

export interface IPostLogService extends IBaseService<IPostLog> {}

class PostLogService extends BaseService<IPostLog> implements IPostLogService {
  constructor() {
    super(postLogRepository);
  }

  async create(body: any): Promise<IPostLog> {
    const temp = JSON.parse(JSON.stringify(body));
    temp.post_id = temp._id;
    delete temp._id;

    // this way, I am calling the parent's method sitting in overriden child method!
    // this saves me from accessing the repository layer from here
    // because if there were 3lines of business logic in parent's create() method,
    // i don't want to rewrite those...
    const post = await super.create(temp);
    return post;
  }
}

export default new PostLogService();
