import Provider from "../../../models/provider";
import { ConversationType } from "../../../utils/enums";
import CustomError from "../../../utils/errors/custom-error";
const db = Provider.getInstance();

const sendMessageToUser = async (
  current_user: any,
  receiver_id: any,
  { text }: { [key: string]: string }
) => {
  if (!text) throw new CustomError("message cannot be empty", 400);

  const sender_id = current_user._id;
  const conversationInDB = await getMessagesWithUser(sender_id, receiver_id);

  const message = {
    text,
    sender: sender_id,
  };

  if (!conversationInDB) {
    return await db.Conversation.create({
      conversation_type: ConversationType.Duo,
      participants: [sender_id, receiver_id],
      messages: [message],
    });
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
};

const getMessagesWithUser = async (current_user: any, receiver_id: any) => {
  const sender_id = current_user._id;
  const conversationInDB: any = await db.Conversation.findOne({
    conversation_type: ConversationType.Duo,
    participants: {
      $all: [sender_id, receiver_id],
    },
  })
    .populate({
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
};

const getConversationList = async (current_user: any) => {
  const sender_id = current_user._id;
  const conversationsInDB = await db.Conversation.find(
    // filter
    {
      conversation_type: ConversationType.Duo,
      participants: {
        $all: [sender_id],
      },
    },
    // projection object
    {
      participants: 1,
    }
  );
  return conversationsInDB;
};

export default { sendMessageToUser, getMessagesWithUser, getConversationList };
