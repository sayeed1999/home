import Provider from "../../../models/provider";
const db = Provider.getInstance();
import { Types } from "mongoose";
import CustomError from "../../../utils/errors/custom-error";
import { IPost } from "../../../models/post.model";
import BaseRepository, { IBaseRepository } from "../../base/repository";

export interface IPostRepository extends IBaseRepository<IPost> {
  // add any specific methods for post repository
  addCommentToPost(
    postId: Types.ObjectId,
    commentId: Types.ObjectId
  ): Promise<IPost>;
}

class PostRepository extends BaseRepository<IPost> implements IPostRepository {
  // Note: use it if you're using Dependency Injection
  // constructor(model: Model<IComment>) {
  //   super(model);
  // }

  // Note: use it if you're not using Dependency Injection
  constructor() {
    super(db.Post);
  }

  async addCommentToPost(postId: Types.ObjectId, commentId: Types.ObjectId) {
    const post = await db.Post.findById(postId);
    if (!post) throw new CustomError("Post not found", 400);
    post.comments.push(commentId);
    await post.save();
    return post;
  }

  async findAll({
    showDeleted = true,
    limit = 10,
    skip = 0,
    commentsCount = 0,
  }: {
    showDeleted?: boolean;
    limit?: number;
    skip?: number;
    commentsCount?: number;
  } = {}) {
    // filtering datas
    const filter: any = {};

    if (!showDeleted)
      filter["$or"] = [{ deletedAt: { $exists: false } }, { deletedAt: null }];

    // populating sub-documents
    let populate: any;

    if (commentsCount)
      populate = {
        path: "comments",
        options: { limit: commentsCount },
      };

    const posts = await super.findAll(filter, skip, limit, populate);
    return posts;
  }

  async findById(id: any) {
    const post = await super.findById(id, "comments");
    return post;
  }
}

// exporting a single instance
const instance = new PostRepository();
export default instance;
