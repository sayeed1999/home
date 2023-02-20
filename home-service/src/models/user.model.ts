import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Post from "./post.model";

export interface IUser extends mongoose.Document {
  _id: any; // mongoose _id
  user_id: number; // id from auth-service
  name: string;
  email: string;
  phone: string;
  birthdate: Date;
  gender: number;
  profile_photo: string;
}

const UserSchema = new Schema(
  {
    user_id: {
      type: Number,
      required: true,
      unique: true, // this is a foreign key to auth-service, must be unique
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    birthdate: {
      type: Date,
    },
    gender: {
      type: Number,
    },
    profile_photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Implementing cascade deletion of posts
 */
const cascadeDelete = async function (this: any, next: any) {
  // retrieving the model first
  const users = await this.model.find(this.getFilter());

  for (let i = 0; users[i]; i++) {
    const user = users[i];
    await Post.deleteMany({ user: user._id });
  }
  next();
};

UserSchema.pre("remove", { document: false, query: true }, cascadeDelete);

export default mongoose.model<IUser>("User", UserSchema);
