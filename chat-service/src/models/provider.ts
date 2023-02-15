import { Model } from "mongoose";
import conversationModel, { IConversation } from "./conversation.model";
import userModel, { IUser } from "./user.model";

export default class Provider {
  private static instance: Provider;
  public User: Model<IUser>;
  public Conversation: Model<IConversation>;

  private constructor() {
    this.User = userModel;
    this.Conversation = conversationModel;
  }

  public static getInstance(): Provider {
    if (!Provider.instance) {
      Provider.instance = new Provider();
    }
    return this.instance;
  }
}
