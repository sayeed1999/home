import Provider from "../../../models/provider";
import { ConversationType } from "../../../utils/enums";
import CustomError from "../../../utils/errors/custom-error";
import DualConversationService from "../../dual-conversation/services";
const db = Provider.getInstance();

export default class GroupConversationService {
  private conversationService: DualConversationService;

  constructor(conversationService: DualConversationService) {
    this.conversationService = conversationService;
    this.conversationService.conversation_type = ConversationType.Group;
  }

  async createGroup(current_user: any) {
    return await db.Conversation.create({
      conversation_type: this.conversationService.conversation_type,
      participants: [current_user._id],
    });
  }

  async addUsersToGroup(conversation_id: any, user_ids: any[]) {
    const conversationInDB = await db.Conversation.findById(conversation_id);
    if (!conversationInDB)
      throw new CustomError("Conversation not found in db", 404);

    const newUsers = user_ids.filter(
      (user) =>
        !conversationInDB.participants.find(
          (participant) => participant.toString() === user.toString()
        )
    );
    if (newUsers.length <= 0)
      throw new CustomError("No new participants to add", 400);

    return await db.Conversation.findByIdAndUpdate(
      conversation_id,
      { $push: { participants: { $each: newUsers } } },
      {
        new: true,
      }
    );
  }

  async removeUserFromGroup(conversation_id: any, user_id: any) {
    const conversationInDB = await db.Conversation.findById(conversation_id);
    if (!conversationInDB)
      throw new CustomError("Conversation not found in db", 404);

    const user = conversationInDB.participants.find(
      (x) => x.toString() === user_id.toString()
    );
    if (!user) throw new CustomError("User not found in conversation", 400);

    // Business logic: If only one user remains & he removes himself, then the group gets deleted!!
    if (conversationInDB.participants.length === 1) {
      return await db.Conversation.findByIdAndDelete(conversation_id);
    }

    return await db.Conversation.findByIdAndUpdate(
      conversation_id,
      {
        $pull: { participants: { _id: user_id } },
      },
      {
        new: true,
      }
    );
  }

  async sendMessageToGroup(
    current_user: any,
    conversation_id: any,
    { text }: { [key: string]: string }
  ) {
    if (!text) throw new CustomError("message cannot be empty", 400);

    const sender_id = current_user._id;
    const conversationInDB = await this.getMessagesWithGroup(
      sender_id,
      conversation_id
    );

    const message = {
      text,
      sender: sender_id,
    };

    if (!conversationInDB) {
      throw new CustomError(
        "Cannot send message to group before group creation",
        400
      );
    }

    return await db.Conversation.findByIdAndUpdate(
      conversationInDB._id,
      {
        $push: {
          messages: {
            $each: [message],
            $position: 0,
          },
        },
      },
      {
        new: true,
      }
    );
  }

  async getMessagesWithGroup(current_user: any, conversation_id: any) {
    const sender_id = current_user._id;
    const conversationInDB: any = await db.Conversation.findOne({
      _id: conversation_id,
      conversation_type: this.conversationService.conversation_type,
      participants: {
        $all: [sender_id],
      },
    })
      ?.populate({
        path: "participants",
        select: "name email",
        options: { lean: true }, // Return plain JavaScript objects
      })
      .lean();

    // Note:- It will help find the sender easily!
    // Map the participant IDs to participant objects temporarily
    conversationInDB.participants = conversationInDB?.participants.reduce(
      (acc: any, participant: any) => {
        acc[participant._id] = participant;
        return acc;
      },
      {}
    );

    return conversationInDB;
  }

  async getConversationList(current_user: any) {
    return this.conversationService.getConversationList(current_user);
  }
}
