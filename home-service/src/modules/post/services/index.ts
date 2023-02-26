import { IPost } from "../../../models/post.model";
import { IUser } from "../../../models/user.model";
import postRepository from "../repository";
import commentRepository from "../../comment/repository";
import postLogService from "../../post-log/services";
import CustomError from "../../../utils/errors/custom-error";
import BaseService, { IBaseService } from "../../base/services";
import { IComment } from "../../../models/comment.model";

export interface IPostService extends IBaseService<IPost> {
  getAllPostsForAdmin(): Promise<IPost[]>;
  getAllPostsForUser(): Promise<IPost[]>;
  getCommentsByPostId(id: string): Promise<IComment[]>;
  softDelete(id: string): Promise<IPost | null>;
  undoDelete(id: string, user: IUser): Promise<IPost | null>;
}

class PostService extends BaseService<IPost> implements IPostService {
  // private user: IUser;

  constructor() {
    super(postRepository);
    // this.user = user;
  }
  /**
   * @description user creates a post
   * @param body
   * @returns
   */
  async create(body: Partial<IPost>, user?: IUser) {
    if (!user) throw new CustomError("Authorization Failed", 403);
    body.user = user._id; // current user is writing the post

    const post = await super.create(body);
    postLogService.create(post);

    return post;
  }

  /**
   * @description admin sees all posts included deleted
   * @returns
   */
  async getAllPostsForAdmin() {
    const posts = await postRepository.findAll();
    return posts;
  }

  /**
   * @description user fetches all posts for newsfeed
   * @returns
   */
  async getAllPostsForUser() {
    const post = await this.findAll({
      showDeleted: false,
      commentsCount: 3,
      limit: 10,
      skip: 0,
    });
    return post;
  }

  /**
   * @description gets all comments for a specific post
   * @param id
   * @returns
   */
  async getCommentsByPostId(id: string) {
    const comments = await commentRepository.findAll({ post: id });
    return comments;
  }

  /**
   * @description updates a post
   * @param id
   * @param body
   * @returns
   */
  async updateById(id: any, body: Partial<IPost>, user?: IUser) {
    if (!user) throw new CustomError("Authorization Failed", 403);
    body.user = user._id; // current user is writing the post
    body._id = id;

    let post = await this.findById(body._id);

    if (user._id.toString() !== post?.user.toString())
      throw new CustomError("Cannot edit other user's post", 403);

    post = await super.updateById(body._id, body);
    postLogService.create(post);

    return post;
  }

  /**
   * hard or soft delete a post, hard delete comments too
   * @param id
   * @param hardDelete
   * @returns
   */
  async deleteById(id: any, hardDelete: boolean = false, user?: IUser) {
    if (!user) throw new CustomError("Authorization Failed", 403);
    let post = await this.findById(id);

    if (user._id.toString() !== post?.user.toString())
      throw new CustomError("Cannot delete other user's post", 403);

    if (!hardDelete) {
      post = await this.softDelete(id);
      postLogService.create(post);
    } else {
      post = await super.deleteById(id);
    }
    return post;
  }

  async softDelete(id: string) {
    let body = {
      deletedAt: new Date(),
    };
    const post = await postRepository.updateById(id, body);
    return post;
  }

  async undoDelete(id: string, user: IUser) {
    let post = await this.findById(id);

    if (!post?.deletedAt)
      throw new CustomError("Post is not in recycle bin", 400);

    if (user._id.toString() !== post?.user.toString())
      throw new CustomError("Cannot undo delete other user's post", 403);

    const body = { deletedAt: null };
    return await postRepository.updateById(id, body);
  }
}

export default new PostService();
