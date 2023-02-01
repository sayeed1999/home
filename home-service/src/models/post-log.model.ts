import mongoose from "mongoose";
import { IPost, PostSchema } from "./post.model";
const Schema = mongoose.Schema;

export interface IPostLog extends IPost {
  post_id: any;
}

export const PostLogSchema = new Schema<IPostLog>({
  post_id: { type: Schema.Types.ObjectId, required: true },
});

PostLogSchema.add(PostSchema);

export default mongoose.model<IPostLog>("PostLog", PostLogSchema);
