import { IComment } from "../../../models/comment.model";
import Provider from "../../../models/provider";
import BaseRepository, { IBaseRepository } from "../../base/repository";
const db = Provider.getInstance();

export interface ICommentRepository extends IBaseRepository<IComment> {
  // add any specific methods for user repository
}

class CommentRepository
  extends BaseRepository<IComment>
  implements ICommentRepository
{
  // Note: use it if you're using Dependency Injection
  // constructor(model: Model<IComment>) {
  //   super(model);
  // }

  // Note: use it if you're not using Dependency Injection
  constructor() {
    super(db.Comment);
  }
}

// exporting a single instance
const instance = new CommentRepository();
export default instance;
