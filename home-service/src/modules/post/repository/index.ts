import Provider from "../../../models/provider";
const db = Provider.getInstance();
import { Types } from "mongoose";
import CustomError from "../../../utils/errors/custom-error";
import { IPost } from "../../../models/post.model";
import BaseRepository, { IBaseRepository } from "../../base/repository";

export interface IPostRepository extends IBaseRepository<IPost> {
  // add any specific methods for user repository
}

// TODO:- need to refractor this...

class PostRepository extends BaseRepository<IPost> implements IPostRepository {
  // Note: use it if you're using Dependency Injection
  // constructor(model: Model<IComment>) {
  //   super(model);
  // }

  // Note: use it if you're not using Dependency Injection
  constructor() {
    super(db.Post);
  }

  addCommentToPost = async (
    postId: Types.ObjectId,
    commentId: Types.ObjectId
  ) => {
    const post = await db.Post.findById(postId);
    if (!post) throw new CustomError("Post not found", 400);
    post.comments.push(commentId);
    await post.save();
    return post;
  };

  findAll = async ({
    showDeleted = true,
    limit = 100,
    skip = 0,
    commentsCount = 0,
  }: {
    showDeleted?: boolean;
    limit?: number;
    skip?: number;
    commentsCount?: number;
  } = {}) => {
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

    let query = db.Post.find(filter).skip(skip).limit(limit).sort({
      createdAt: -1,
    });

    // .populate() must have a path if used..
    if (populate) query = query.populate(populate);

    const post = await query;
    return post;
  };

  findById = async (id: any) => {
    const post = await db.Post.findById(id).populate("comments");
    return post;
  };
}

// exporting a single instance
const instance = new PostRepository();
export default instance;
