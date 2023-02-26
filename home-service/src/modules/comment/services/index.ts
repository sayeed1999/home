import { ObjectId } from "mongoose";
import commentRepository from "../repository";
import postRepository from "../../post/repository";
import { IUser } from "../../../models/user.model";
import { IComment } from "../../../models/comment.model";
import BaseService, { IBaseService } from "../../base/services";

export interface ICommentService extends IBaseService<IComment> {
  createComment(
    post_id: ObjectId | string,
    body: IComment,
    user: IUser
  ): Promise<IComment>;
}

class CommentService extends BaseService<IComment> implements ICommentService {
  constructor() {
    super(commentRepository);
  }

  createComment = async (
    post_id: ObjectId | string,
    body: IComment,
    user: IUser
  ) => {
    body.user = user._id; // current user is writing the comment
    body.post = post_id;

    const comment = await commentRepository.create(body);
    await postRepository.addCommentToPost(body.post, comment._id);

    return comment;
  };
}

export default new CommentService();
