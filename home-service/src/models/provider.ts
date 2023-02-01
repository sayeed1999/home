import { Model } from "mongoose";
import commentModel, { IComment } from "./comment.model";
import postLogModel, { IPostLog } from "./post-log.model";
import postModel, { IPost } from "./post.model";
import userModel, { IUser } from "./user.model";

export default class Provider {
  private static instance: Provider;
  public User: Model<IUser>;
  public Post: Model<IPost>;
  public PostLog: Model<IPostLog>;
  public Comment: Model<IComment>;

  private constructor() {
    this.User = userModel;
    this.Post = postModel;
    this.PostLog = postLogModel;
    this.Comment = commentModel;
  }

  public static getInstance(): Provider {
    if (!Provider.instance) {
      Provider.instance = new Provider();
    }
    return this.instance;
  }
}
