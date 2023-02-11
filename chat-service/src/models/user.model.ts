import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: Date;
  gender: number;
  profile_photo: string;
}

// User Schema
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
