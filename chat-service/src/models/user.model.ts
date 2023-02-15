import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
}

const UserSchema = new Schema(
  {
    user_id: {
      // will come from auth microservice
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
