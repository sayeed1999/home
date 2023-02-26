import { IPostLog } from "../../../models/post-log.model";
import BaseRepository, { IBaseRepository } from "../../base/repository";
import Provider from "../../../models/provider";
const db = Provider.getInstance();

export interface IPostLogRepository extends IBaseRepository<IPostLog> {
  // add any specific methods for user repository
}

class PostLogRepository
  extends BaseRepository<IPostLog>
  implements IPostLogRepository
{
  // Note: use it if you're using Dependency Injection
  // constructor(model: Model<IComment>) {
  //   super(model);
  // }

  // Note: use it if you're not using Dependency Injection
  constructor() {
    super(db.PostLog);
  }
}

// exporting a single instance
const instance = new PostLogRepository();
export default instance;
