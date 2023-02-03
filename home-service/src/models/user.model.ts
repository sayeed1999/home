import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

export default mongoose.model<IUser>("User", UserSchema);
